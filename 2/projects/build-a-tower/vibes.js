let lastTime = 0;
const fps = 60;
const fpsInterval = 1000 / fps;

let leftTest = 0;

const fallArea = document.getElementById("fallArea"); 
const mainArea = document.getElementById("mainArea");
const baseBuildingBlock = document.getElementById("baseBuildingBlock");
const endContainer = document.getElementById("endContainer");
const endHeading = document.getElementById("endHeading");

mainArea.style.width = `${document.body.scrollWidth * 1.5}px`;
baseBuildingBlock.style.left = `${(document.body.scrollWidth * 1.5) / 3.0 - 75}px`;

let createNewBlock = true;
const validBlocks = ['block1.png','block2.png','block3.png','block4.png','block5.png']

let lastActiveBlock = baseBuildingBlock;
let activeBlock = {
    element: null,
    top: 0,
}
let stopLoop = false;
let totalSegments = 1;

function mainLoop() {
    if (createNewBlock) {
        createNewBlock = false;

        const newImg = document.createElement("img");

        newImg.src = validBlocks[Math.floor(Math.random()*validBlocks.length)];
        newImg.id = "fallingBuildingBlock";
        newImg.style.left = `${window.innerWidth/2 - 300 + 600 * Math.random()}px`
        newImg.style.width = `${150 * 1.5 - 4*totalSegments}px`
        fallArea.appendChild(newImg);

        activeBlock.top = 0;
        activeBlock.element = newImg;
    }

    activeBlock.top += 4 + totalSegments * 0.2;
    activeBlock.element.style.top = `${activeBlock.top}px`

    const lastActiveBlockBox = lastActiveBlock.getBoundingClientRect();
    const activeBoundingBox = activeBlock.element.getBoundingClientRect();

    if (activeBoundingBox.bottom > lastActiveBlockBox.top) {

        if (activeBoundingBox.right < lastActiveBlockBox.left || activeBoundingBox.left > lastActiveBlockBox.right) {
            stopLoop = true;
            endContainer.style.display = 'flex';
            endHeading.textContent = `Its over! You stacked ${totalSegments} blocks!`
        }

        createNewBlock = true;

        activeBlock.element.style.left = `${activeBoundingBox.left + window.scrollX}px`;
        activeBlock.element.style.bottom = `${150 * totalSegments}px`;
        activeBlock.element.style.top = null;
        activeBlock.element.style.position = 'absolute';
        
        mainArea.appendChild(activeBlock.element);
        lastActiveBlock = activeBlock.element;
        totalSegments += 1;
        mainArea.style.height = `calc(100vh + ${150*totalSegments}px)`;
        
        setTimeout(() => window.scrollTo({top: 450, behavior: "smooth"}), 250);
    }
}

function animate(currentTime) {
    requestAnimationFrame(animate);

    const elapsed = currentTime - lastTime;

    if (elapsed >= fpsInterval) {
        lastTime = currentTime - (elapsed % fpsInterval);
        !stopLoop && mainLoop();
    }
}

// Start the loop
requestAnimationFrame((timestamp) => {
    lastTime = timestamp;
    requestAnimationFrame(animate);
});


window.scrollTo(document.body.scrollWidth / 2, 0);


