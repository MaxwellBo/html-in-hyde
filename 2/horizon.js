/*
 * Adapted from dnlzro/horizon.
 * https://github.com/dnlzro/horizon
 *
 * Physical model: Sébastien Hillaire, "A Scalable and Production Ready
 * Sky and Atmosphere Rendering Technique".
 * Implementation derived from Andrew Helmer's MIT-licensed
 * "Production Sky Rendering".
 */

const PI = Math.PI;
const RAYLEIGH_SCATTER = [5.802e-6, 13.558e-6, 33.1e-6];
const MIE_SCATTER = 3.996e-6;
const MIE_ABSORB = 4.44e-6;
const OZONE_ABSORB = [0.65e-6, 1.881e-6, 0.085e-6];
const RAYLEIGH_SCALE_HEIGHT = 8e3;
const MIE_SCALE_HEIGHT = 1.2e3;
const GROUND_RADIUS = 6_360e3;
const TOP_RADIUS = 6_460e3;
const SAMPLES = 32;
const FOV_DEG = 75;
const EXPOSURE = 25;
const GAMMA = 2.2;
const SUNSET_BIAS_STRENGTH = 0.1;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const length = (vector) => Math.hypot(...vector);
const normalize = (vector) => {
  const magnitude = length(vector) || 1;
  return vector.map((value) => value / magnitude);
};
const add = (a, b) => a.map((value, index) => value + b[index]);
const scale = (vector, amount) => vector.map((value) => value * amount);

function aces(color) {
  return color.map((channel) => {
    const numerator = channel * (2.51 * channel + 0.03);
    const denominator = channel * (2.43 * channel + 0.59) + 0.14;
    return clamp(numerator / denominator, 0, 1);
  });
}

function applySunsetBias([red, green, blue]) {
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  const weight = 1 / (1 + 2 * luminance);
  const strength = SUNSET_BIAS_STRENGTH;
  return [
    Math.max(0, red * (1 + 0.5 * strength * weight)),
    Math.max(0, green * (1 - 0.5 * strength * weight)),
    Math.max(0, blue * (1 + strength * weight))
  ];
}

function rayleighPhase(angle) {
  return (3 * (1 + Math.cos(angle) ** 2)) / (16 * PI);
}

function miePhase(angle) {
  const g = 0.8;
  const numerator = (1 - g ** 2) * (1 + Math.cos(angle) ** 2);
  const denominator = (2 + g ** 2) * (1 + g ** 2 - 2 * g * Math.cos(angle)) ** 1.5;
  return (3 / (8 * PI)) * numerator / denominator;
}

function intersectSphere(position, direction, radius) {
  const b = dot(position, direction);
  const c = dot(position, position) - radius ** 2;
  const discriminant = b ** 2 - c;
  if (discriminant < 0) return null;
  const near = -b - Math.sqrt(discriminant);
  return near < 0 ? -b + Math.sqrt(discriminant) : near;
}

function computeTransmittance(height, angle) {
  const rayOrigin = [0, GROUND_RADIUS + height, 0];
  const rayDirection = [Math.sin(angle), Math.cos(angle), 0];
  const distance = intersectSphere(rayOrigin, rayDirection, TOP_RADIUS);
  if (!distance) return [1, 1, 1];

  const segmentLength = distance / SAMPLES;
  let distanceAlongRay = segmentLength / 2;
  let rayleighDepth = 0;
  let mieDepth = 0;
  let ozoneDepth = 0;

  for (let i = 0; i < SAMPLES; i++) {
    const position = add(rayOrigin, scale(rayDirection, distanceAlongRay));
    const sampleHeight = length(position) - GROUND_RADIUS;
    rayleighDepth += Math.exp(-sampleHeight / RAYLEIGH_SCALE_HEIGHT) * segmentLength;
    mieDepth += Math.exp(-sampleHeight / MIE_SCALE_HEIGHT) * segmentLength;
    const ozoneDensity = 1 - Math.min(Math.abs(sampleHeight - 25e3) / 15e3, 1);
    ozoneDepth += ozoneDensity * segmentLength;
    distanceAlongRay += segmentLength;
  }

  return RAYLEIGH_SCATTER.map((rayleighScatter, channel) => {
    const opticalDepth =
      rayleighScatter * rayleighDepth +
      MIE_ABSORB * mieDepth +
      OZONE_ABSORB[channel] * ozoneDepth;
    return Math.exp(-opticalDepth);
  });
}

export default function renderGradient(solarAltitude) {
  const cameraPosition = [0, GROUND_RADIUS, 0];
  const sunDirection = normalize([Math.cos(solarAltitude), Math.sin(solarAltitude), 0]);
  const focalZ = 1 / Math.tan((FOV_DEG * 0.5 * PI) / 180);
  const stops = [];

  for (let i = 0; i < SAMPLES; i++) {
    const skyPosition = i / (SAMPLES - 1);
    const viewDirection = normalize([0, skyPosition, focalZ]);
    const inscattered = [0, 0, 0];
    const distanceToAtmosphere = intersectSphere(cameraPosition, viewDirection, TOP_RADIUS);

    if (distanceToAtmosphere !== null && distanceToAtmosphere > 0) {
      const segmentLength = distanceToAtmosphere / SAMPLES;
      let distanceAlongRay = segmentLength / 2;
      const cameraRadius = length(cameraPosition);
      const pointsDownward = dot(cameraPosition, viewDirection) / cameraRadius < 0;
      const cameraAngle = Math.acos(Math.abs(clamp(
        dot(normalize(cameraPosition), viewDirection),
        -1,
        1
      )));
      const cameraToSpace = computeTransmittance(cameraRadius - GROUND_RADIUS, cameraAngle);

      for (let j = 0; j < SAMPLES; j++) {
        const samplePosition = add(cameraPosition, scale(viewDirection, distanceAlongRay));
        const sampleRadius = length(samplePosition);
        const up = normalize(samplePosition);
        const sampleHeight = sampleRadius - GROUND_RADIUS;
        const viewAngle = Math.acos(Math.abs(clamp(dot(up, viewDirection), -1, 1)));
        const sunAngle = Math.acos(clamp(dot(up, sunDirection), -1, 1));
        const toSpace = computeTransmittance(sampleHeight, viewAngle);
        const cameraToSample = toSpace.map((value, channel) =>
          pointsDownward
            ? value / cameraToSpace[channel]
            : cameraToSpace[channel] / value
        );
        const light = computeTransmittance(sampleHeight, sunAngle);
        const rayleighDensity = Math.exp(-sampleHeight / RAYLEIGH_SCALE_HEIGHT);
        const mieDensity = Math.exp(-sampleHeight / MIE_SCALE_HEIGHT);
        const sunViewAngle = Math.acos(clamp(dot(sunDirection, viewDirection), -1, 1));
        const rayleigh = rayleighPhase(sunViewAngle);
        const mie = miePhase(sunViewAngle);

        for (let channel = 0; channel < 3; channel++) {
          const scattering =
            RAYLEIGH_SCATTER[channel] * rayleighDensity * rayleigh +
            MIE_SCATTER * mieDensity * mie;
          inscattered[channel] +=
            cameraToSample[channel] * light[channel] * scattering * segmentLength;
        }
        distanceAlongRay += segmentLength;
      }
    }

    let color = inscattered.map((channel) => channel * EXPOSURE);
    color = applySunsetBias(color);
    color = aces(color);
    const rgb = color.map((channel) =>
      Math.round(clamp(channel, 0, 1) ** (1 / GAMMA) * 255)
    );
    stops.push({ percent: (1 - skyPosition) * 100, rgb });
  }

  stops.sort((a, b) => a.percent - b.percent);
  const colorStops = stops.map(({ percent, rgb }) =>
    `rgb(${rgb.join(", ")}) ${Math.round(percent * 100) / 100}%`
  );

  return {
    background: `linear-gradient(to bottom, ${colorStops.join(", ")})`,
    top: stops[0].rgb,
    bottom: stops.at(-1).rgb
  };
}
