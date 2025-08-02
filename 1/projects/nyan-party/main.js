
let circleCount = 0;
let circles = [];
const width = window.innerWidth;
const height = window.innerHeight;
const radius = 40;
// Calculate interval from BPM
const bpm = 142;
const interval = 120000  / bpm; // ms per beat

let intervalObject

let alternateGrow = true;

const faces = [":o", ":)", ":O", ":(", ":|", ":P", ";)"]

// Start render loop
const audio = document.getElementById("nyan");

document.getElementById("reset").style.visibility = "hidden";

class Circle {
    constructor(positionX, positionY, vx, vy) {
        this.radius = Math.random() * 100 + radius;
        this.vx = vx;
        this.vy = vy;
        this.x = positionX;
        this.y = positionY;
        this.circle = document.createElement("div");
        this.circle.classList.add("circle")
        this.circle.style.backgroundColor = this.getRandomHexColor()
        this.circle.style.width =  this.radius * 2 + 'px';
        this.circle.style.height = this.radius * 2 + 'px';
        this.circle.style.left = (this.x - this.radius) + 'px';
        this.circle.style.top = (this.y - this.radius) + 'px';
        this.faceIndex = 0;
        document.body.appendChild(this.circle);

        this.face = document.createElement("div");
        this.face.classList.add("face");
        this.face.innerHTML = (faces[this.faceIndex])
        this.face.style.fontSize = this.radius * 0.5 + "px";
        this.circle.appendChild(this.face);

    }
    
    getRandomHexColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }


    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wall collision
      if (this.x - this.radius < 0 || this.x + this.radius > width) {
        this.vx *= -1;
      }
      if (this.y - this.radius < 0 || this.y + this.radius > height) {
        this.vy *= -1;
      }

      this.x = Math.max(this.radius, Math.min(this.x, width - this.radius));
      this.y = Math.max(this.radius, Math.min(this.y, height - this.radius));
    }

    render() {
       this.circle.style.left = (this.x - this.radius) + 'px';
       this.circle.style.top = (this.y - this.radius) + 'px';
       this.circle.style.width = (this.radius * 2) + 'px';
       this.circle.style.height = (this.radius * 2) + 'px';
    }
}

function start() {
    intervalObject = setInterval(changeSize, interval);
    animate();
    document.getElementById("start").style.visibility = "hidden";
    audio.play();
    document.getElementById("reset").style.visibility = "visible";
}

function addCircle() {
    let x = Math.random() * (width - 2 * radius) + radius;
    let y = Math.random() * (height - 2 * radius) + radius;
    let vx = (Math.random() - 0.5) * 10;
    let vy = (Math.random() - 0.5) * 10;

    const circle = new Circle(x, y, vx, vy, radius);
    circles.push(circle);
}

function growShrinkCircle(type) {
    for(let i = 0; i < circles.length; ++i) {
        let radius = circles[i].radius;
        radius = type == "grow" ? radius + 50 : Math.max(20, radius - 50);
        circles[i].radius = radius;
        circles[i].circle.style.width = radius + "px";
        circles[i].circle.style.height = radius + "px";
        circles[i].face.style.fontSize = radius * 1.5 + "px";
    }

    alternateGrow = !alternateGrow
}


// Collision check between two circles
function resolveCollision(c1, c2) {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const dist = Math.hypot(dx, dy);

    if (dist < c1.radius + c2.radius) {
        // Normalize the vector
        const angle = Math.atan2(dy, dx);
        const overlap = (c1.radius + c2.radius - dist) / 2;

        // Displace circles away from each other
        c1.x -= Math.cos(angle) * overlap;
        c1.y -= Math.sin(angle) * overlap;
        c2.x += Math.cos(angle) * overlap;
        c2.y += Math.sin(angle) * overlap;

        // Simple 1D elastic collision
        const vxTotal = c1.vx - c2.vx;
        const vyTotal = c1.vy - c2.vy;

        c1.vx = c2.vx;
        c1.vy = c2.vy;
        c2.vx = c1.vx + vxTotal;
        c2.vy = c1.vy + vyTotal;
    }
}

function changeSize() {
    if(circles.length != 50) addCircle()
    alternateGrow ? growShrinkCircle("grow") : growShrinkCircle("shrink");
    cycleFaces();
}

function cycleFaces() {
    for(let i = 0; i < circles.length; i++) {
        if(circles[i].faceIndex == faces.length - 1) {
            circles[i].faceIndex = 0
        } else {
            circles[i].faceIndex = circles[i].faceIndex + 1
            console.log(circles[i].faceIndex)
        }
        circles[i].face.innerHTML = faces[circles[i].faceIndex]
    }
}

// Render loop
function animate() {
    console.log("TEST2")
    for (let i = 0; i < circles.length; i++) {
        const c1 = circles[i];
        c1.update();

        // Check collisions with other circles
        for (let j = i + 1; j < circles.length; j++) {
        resolveCollision(c1, circles[j]);
        }

        c1.render();
    }

    requestAnimationFrame(animate);
}

function reset() {
    clearInterval(intervalObject);
    circleCount = 0;
    circles = [];
    document.querySelectorAll(".circle").forEach(circle => circle.remove());
    document.getElementById("start").style.visibility = "visible";
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("reset").style.visibility = "hidden";
}
