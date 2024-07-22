// Get the car element
const car = document.getElementById('car');

const rTelemetry = document.getElementById('rTelemetry');
const xTelemetry = document.getElementById('xTelemetry');
const yTelemetry = document.getElementById('yTelemetry');
const vTelemetry = document.getElementById('vTelemetry');

let r = 0;
let x = 0
let y = 0;
let v = 0;

// Event listener for keyboard inputs
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            r += -5;
            break;
        case 'ArrowRight':
            r += 5; 
            break;
        case 'ArrowUp':
            v = Math.min(10, v + 1);
            break;
        case 'ArrowDown':
            v = Math.max(0, v - 1);
            break;
        default:
            break;
    }
});

function moveCar() {
    x += v * Math.cos(r * (Math.PI / 180));
    y += v * Math.sin(r * (Math.PI / 180));
    car.style.transform = `translate(${x}px, ${y}px) rotate(${r}deg)`
    requestAnimationFrame(moveCar);
}

function updateTelemetry() {
    // Example: continuously incrementing the number
    setInterval(() => {
        xTelemetry.textContent = x;
        yTelemetry.textContent = y;
        rTelemetry.textContent = r;
        vTelemetry.textContent = v;
    }, 100);
}

// Start the animation loop
updateTelemetry();
moveCar();


