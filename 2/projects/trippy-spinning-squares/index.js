const template = document.getElementById('template');
const boxes = document.getElementById('boxes');
const box1 = template.content.querySelector('#box1');
const boxContainer1 = template.content.querySelector('#box-container-1');

const totalBoxes = 10;

let boxSize = 1500;

for (let m = 1; m < 15; m++) {
    for (let n = 1; n < totalBoxes; n++) {

        let rgba = [100, 120, 140, 0.2];

        for (let i = 0; i < 3; i++) {
            rgba[i] = ((rgba[i] + 40) * n) % 255;
        }
        const newRgbStr = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;

        const newBox = box1.cloneNode(true);
        newBox.id = 'box' + n + m + 1;
        newBox.style.backgroundColor = newRgbStr;
        newBox.style.animation = `spin ${n*2}s linear infinite`;
        newBox.style.width = boxSize + 'px';
        newBox.style.height = boxSize + 'px';
        newBox.style.zIndex = m;
        // newBox.style.transform = `rotate(${n*2 % 90}deg)`;
        // newBox.style.animationDelay = `${n * 100}ms`;
        boxes.appendChild(newBox);
    }

    const w = 0.8 * boxSize;

    const newBoxContainer = boxContainer1.cloneNode(true);
    newBoxContainer.id = m + '';
    newBoxContainer.style.zIndex = m + 1;
    newBoxContainer.style.width = w + 'px';
    newBoxContainer.style.height = w + 'px';
    boxes.appendChild(newBoxContainer);

    boxSize *= 0.75;
}

