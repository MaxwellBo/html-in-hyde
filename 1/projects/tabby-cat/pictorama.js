document.addEventListener("DOMContentLoaded", function() {
    const imageElement = document.querySelector('.my-positioned-image');

    const urlParams = new URLSearchParams(window.location.search);
    const initialLeft = Number(urlParams.get('left'));
    const initialTop = Number(urlParams.get('top'));

    if (!isNaN(initialLeft)) {
        imageElement.style.left = `${initialLeft}px`;
        imageElement.style.top =  `${initialTop}px`
    }
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      move("up")
      break;
    case 'ArrowDown':
      move("down")
      break;
    case 'ArrowLeft':
      move("left")
      break;
    case 'ArrowRight':
      move("right")
      break;
    default:
  }
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function move(direction) {
    const imageElement = document.querySelector('.my-positioned-image');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const currentLeft = Number(urlParams.get('left')) || 0;
    const currentTop = Number(urlParams.get('top')) || 0;

    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;

    switch (direction) {
        case "left":
            imageElement.style.left = `${currentLeft}px`;
            params.set("left", String(currentLeft - 10));
            break;
        case "right":
            imageElement.style.left = `${currentLeft}px`;
            params.set("left", String(currentLeft + 10));
            break
        case "down":
            imageElement.style.top = `${currentTop}px`;
            params.set("top", String(currentTop + 10));
            break
        case "up":
            imageElement.style.top = `${currentTop}px`;
            params.set("top", String(currentTop - 10));
            break
        default:
            console.log("fuck")
    }

    const newUrl = currentUrl.toString();
    window.open(newUrl, "_blank");
    sleep(10)
    window.close()

}