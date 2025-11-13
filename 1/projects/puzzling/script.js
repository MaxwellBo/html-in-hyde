const MASK_SIZE_MULTIPLIER = 1 / 0.75;

const DIFFICULTY = {
    EASY: {
        ROWS: 3,
        COLUMNS: 4,
        PIECE_SIZE: 128
    },
    MEDIUM: {
        ROWS: 6,
        COLUMNS: 8,
        PIECE_SIZE: 64
    },
    HARD: {
        ROWS: 12,
        COLUMNS: 16,
        PIECE_SIZE: 32
    }
};

const SIDE = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3,
};

const SIDE_TYPE = {
    FLAT: 'FLAT',
    TAB: 'TAB',
    BLANK: 'BLANK'
};

const COMPATIBLE_SIDE_TYPE = {
    FLAT: SIDE_TYPE.FLAT,
    TAB: SIDE_TYPE.BLANK,
    BLANK: SIDE_TYPE.TAB
};

const PIECE_TYPE_SIDES = {
    tl: [SIDE_TYPE.FLAT, SIDE_TYPE.BLANK, SIDE_TYPE.TAB, SIDE_TYPE.FLAT],
    tr: [SIDE_TYPE.FLAT, SIDE_TYPE.FLAT, SIDE_TYPE.TAB, SIDE_TYPE.TAB],
    t: [SIDE_TYPE.FLAT, SIDE_TYPE.BLANK, SIDE_TYPE.TAB, SIDE_TYPE.TAB],
    bl: [SIDE_TYPE.BLANK, SIDE_TYPE.BLANK, SIDE_TYPE.FLAT, SIDE_TYPE.FLAT],
    br: [SIDE_TYPE.BLANK, SIDE_TYPE.FLAT, SIDE_TYPE.FLAT, SIDE_TYPE.TAB],
    b: [SIDE_TYPE.BLANK, SIDE_TYPE.BLANK, SIDE_TYPE.FLAT, SIDE_TYPE.TAB],
    ml: [SIDE_TYPE.BLANK, SIDE_TYPE.BLANK, SIDE_TYPE.TAB, SIDE_TYPE.FLAT],
    mr: [SIDE_TYPE.BLANK, SIDE_TYPE.FLAT, SIDE_TYPE.TAB, SIDE_TYPE.TAB],
    m: [SIDE_TYPE.BLANK, SIDE_TYPE.BLANK, SIDE_TYPE.TAB, SIDE_TYPE.TAB]
};

let rows;
let columns;
let pieceSize;
let pieceOffset;
let numberOfPieces;
let boardHeight;
let boardWidth;
let margin;
let sideOffsetHorizontal;
let sideOffsetVertical;
let highestZIndex;
let activePiece;

document.addEventListener('DOMContentLoaded', () => {

    const instructions = document.getElementById('instructions');

    document.getElementById('showInstructions').addEventListener('click', () => {
        instructions.style.display = 'block';
    });

    document.getElementById('hideInstructions').addEventListener('click', () => {
        instructions.style.display = 'none';
        localStorage.setItem('showInstructions', 'none');
    });

    instructions.style.display = localStorage.getItem('showInstructions') ?? 'block';

    const uploadInput = document.getElementById('imageUpload');
    document.getElementById('uploadButton').addEventListener('click', (e) => {
        e.preventDefault(); 
        uploadInput.click(); 
    });
    uploadInput.addEventListener('change', handleImageUpload);

    document.getElementById('easyButton').addEventListener('click', () => {
        initializeGame(localStorage.getItem('backgroundImage') ?? './images/default.jpg', 'EASY');
        localStorage.setItem('difficulty', 'EASY');
    });

    document.getElementById('mediumButton').addEventListener('click', () => {
        initializeGame(localStorage.getItem('backgroundImage') ?? './images/default.jpg', 'MEDIUM');
        localStorage.setItem('difficulty', 'MEDIUM');
    });

    document.getElementById('hardButton').addEventListener('click', () => {
        initializeGame(localStorage.getItem('backgroundImage') ?? './images/default.jpg', 'HARD');
        localStorage.setItem('difficulty', 'HARD');
    });

    initializeGame(localStorage.getItem('backgroundImage') ?? './images/default.jpg', localStorage.getItem('difficulty') ?? 'MEDIUM');
});

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const backgroundImage = URL.createObjectURL(file);
        document.querySelectorAll('.piece').forEach(piece => {
            piece.style.backgroundImage = `url('${backgroundImage}')`;
        });
        localStorage.setItem('backgroundImage', backgroundImage);
    }
}

function initializeGame(backgroundImage, difficulty) {
    const difficultySettings = DIFFICULTY[difficulty];

    rows = difficultySettings.ROWS;
    columns = difficultySettings.COLUMNS;
    pieceSize = difficultySettings.PIECE_SIZE;
    pieceOffset = ((pieceSize * MASK_SIZE_MULTIPLIER) - pieceSize) / 2;
    numberOfPieces = rows * columns;
    boardHeight = rows * pieceSize;
    boardWidth = columns * pieceSize;
    margin = (pieceSize * MASK_SIZE_MULTIPLIER) / 2;
    sideOffsetHorizontal = [0, pieceSize, 0, -pieceSize];
    sideOffsetVertical = [-pieceSize, 0, pieceSize, 0];
    highestZIndex = 1;
    activePiece = null;

    updateDifficultyButtons(difficulty);

    document.querySelectorAll('.piece').forEach(piece => piece.remove());

    const board = document.getElementById('board');
    board.style.height = `${boardHeight}px`;
    board.style.width = `${boardWidth}px`;

    const instructions = document.getElementById('instructions');
    instructions.style.height = `${boardHeight}px`;
    instructions.style.width = `${boardWidth}px`;

    createAndPlacePieces(numberOfPieces, backgroundImage);
}

function updateDifficultyButtons(difficulty) {
    const buttons = [
        document.getElementById('easyButton'),
        document.getElementById('mediumButton'),
        document.getElementById('hardButton')
    ];

    buttons.forEach(button => {
        button.classList.remove('difficulty');

        if (button.id.toUpperCase().includes(difficulty)) {
            button.classList.add('difficulty');
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && activePiece) {
        let currentRotation = parseInt(activePiece.dataset.rotation) || 0;
        currentRotation = (currentRotation + 90) % 360;
        activePiece.dataset.rotation = currentRotation;
        activePiece.style.transform = `rotate(${currentRotation}deg)`;
    }
});

function getPieceType(row, column) {
    const isTop = row === 0;
    const isBottom = row === rows - 1;
    const isLeft = column === 0;
    const isRight = column === columns - 1;

    if (isTop) {
        if (isLeft) return 'tl';
        if (isRight) return 'tr';
        return 't';
    }

    if (isBottom) {
        if (isLeft) return 'bl';
        if (isRight) return'br';
        return 'b';
    }

    if (isLeft) return 'ml';
    if (isRight) return 'mr';
    return 'm';
}

function getRandomNonOverlappingPosition(mainRect, boardRect, pieceSize) {
    let randomTop, randomLeft;
    let isOverlapping = true;
    
    const maxTop = mainRect.height - margin - pieceSize;
    const maxLeft = mainRect.width - margin - pieceSize;

    while (isOverlapping) {
        randomTop = Math.random() * maxTop;
        randomLeft = Math.random() * maxLeft;

        const pieceTop = mainRect.top + randomTop;
        const pieceLeft = mainRect.left + randomLeft;
        const pieceBottom = pieceTop + pieceSize;
        const pieceRight = pieceLeft + pieceSize;

        const boardCollisionLeft = boardRect.left - margin;
        const boardCollisionRight = boardRect.right + margin;
        const boardCollisionTop = boardRect.top - margin;
        const boardCollisionBottom = boardRect.bottom + margin;

        if (
            pieceRight < boardCollisionLeft ||
            pieceLeft > boardCollisionRight ||
            pieceBottom < boardCollisionTop ||
            pieceTop > boardCollisionBottom
        ) {
            isOverlapping = false;
        }
    }
    return { randomTop, randomLeft };
}

function createAndPlacePieces(numberOfPieces, backgroundImage) {
    const main = document.querySelector('main');
    const board = document.getElementById('board');

    const mainRect = main.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    for (let i = 0; i < numberOfPieces; i++) {
        const piece = document.createElement('div');
        piece.classList.add('piece');

        piece.style.height = `${Math.ceil(pieceSize * MASK_SIZE_MULTIPLIER)}px`;
        piece.style.width = `${Math.ceil(pieceSize * MASK_SIZE_MULTIPLIER)}px`;

        const row = Math.floor(i / columns);
        const column = i % columns;

        const pieceType = getPieceType(row, column)
        piece.dataset.pieceType = pieceType;
        piece.style.maskImage = `url(#${pieceType})`;

        piece.style.backgroundImage = `url(${backgroundImage})`;
        piece.style.backgroundRepeat = 'no-repeat';
        piece.style.backgroundSize = `${boardWidth}px ${boardHeight}px`;
        const backgroundPosX = -column * pieceSize + pieceOffset;
        const backgroundPosY = -row * pieceSize + pieceOffset;
        piece.style.backgroundPosition = `${backgroundPosX}px ${backgroundPosY}px`;

        highestZIndex++;
        piece.style.zIndex = highestZIndex;

        const randomRotation = Math.floor(Math.random() * 360);
        piece.dataset.rotation = randomRotation;
        piece.style.transform = `rotate(${randomRotation}deg)`;

        const { randomTop, randomLeft } = getRandomNonOverlappingPosition(mainRect, boardRect, pieceSize);
        piece.style.top = `${mainRect.top + randomTop - pieceOffset}px`;
        piece.style.left = `${mainRect.left + randomLeft - pieceOffset}px`;

        main.appendChild(piece);
        piece.addEventListener('click', togglePiece);
    }
}

function togglePiece(e) {
    e.preventDefault();
    const clickedPiece = e.target;

    if (activePiece === null) {
        activePiece = clickedPiece;

        highestZIndex++;
        activePiece.style.zIndex = highestZIndex;

        activePiece.style.cursor = 'grabbing';
        document.addEventListener('mousemove', moveActivePiece);

        let currentRotation = parseInt(activePiece.dataset.rotation) || 0;
        const snappedRotation = Math.round(currentRotation / 90) * 90;
        activePiece.dataset.rotation = snappedRotation;
        activePiece.style.transform = `rotate(${snappedRotation}deg)`;
    } else {
        putDownPiece();
    }
}

function moveActivePiece(e) {
    if (activePiece) {
        const newTop = e.clientY - (activePiece.offsetHeight / 2);
        const newLeft = e.clientX - (activePiece.offsetWidth / 2);

        activePiece.style.top = `${newTop}px`;
        activePiece.style.left = `${newLeft}px`;
    }
}

function putDownPiece() {
    if (activePiece) {
        document.removeEventListener('mousemove', moveActivePiece);
        activePiece.style.cursor = 'grab';

        snapToGrid(activePiece);

        activePiece = null;
    }
}

function isPieceOverTheBoard(pieceRect, boardRect) {
    const overlapX = Math.max(0, Math.min(pieceRect.right, boardRect.right) - Math.max(pieceRect.left, boardRect.left));
    const overlapY = Math.max(0, Math.min(pieceRect.bottom, boardRect.bottom) - Math.max(pieceRect.top, boardRect.top));

    const isOverlapMoreThanHalfX = overlapX / pieceRect.width > 0.5;
    const isOverlapMoreThanHalfY = overlapY / pieceRect.height > 0.5;

    return isOverlapMoreThanHalfX && isOverlapMoreThanHalfY;
}

function isPositionOffTheBoard(targetLeft, targetTop, boardRect) {
    return (
        targetTop < boardRect.top ||
        targetLeft + pieceSize > boardRect.right ||
        targetTop + pieceSize > boardRect.bottom ||
        targetLeft < boardRect.left
    );
}

function getPieceInPosition(targetLeft, targetTop) {
    const tolerance = 1.0;
    const pieces = document.querySelectorAll('.piece');
    for (const piece of pieces) {
        const pieceRect = piece.getBoundingClientRect();

        const visibleLeft = pieceRect.left + pieceOffset;
        const visibleTop = pieceRect.top + pieceOffset;

        const leftMatch = Math.abs(visibleLeft - targetLeft) < tolerance;
        const topMatch = Math.abs(visibleTop - targetTop) < tolerance;

        if (leftMatch && topMatch) {
            return piece;
        }
    }
    return undefined;
}

function getPieceSideType(piece, side) {
    const rotationOffset = (piece.dataset.rotation / 90) % 4;
    const adjustedIndex = (side - rotationOffset + 4) % 4; 

    const pieceSideTypes = PIECE_TYPE_SIDES[piece.dataset.pieceType];

    return pieceSideTypes[adjustedIndex];
}

function isPositionValid(piece, targetLeft, targetTop, boardRect) {
    const sides = Object.values(SIDE);
    for (const side of sides) {
        const pieceSideType = getPieceSideType(piece, side);

        const neighborLeft = targetLeft + sideOffsetHorizontal[side];
        const neighborTop = targetTop + sideOffsetVertical[side];

        if (isPositionOffTheBoard(neighborLeft, neighborTop, boardRect)) {
            if (SIDE_TYPE.FLAT != COMPATIBLE_SIDE_TYPE[pieceSideType]) {
                return false;
            }
            continue;
        }

        const neighborPiece = getPieceInPosition(neighborLeft, neighborTop);
        if (!neighborPiece) {
            if (SIDE_TYPE.FLAT == pieceSideType) {
                return false;
            }
            continue;
        }

        const neighborSideType = getPieceSideType(neighborPiece, (side + 2) % 4);
        if (neighborSideType != COMPATIBLE_SIDE_TYPE[pieceSideType]) {
            return false;
        }
    }
    return true;
}

function snapToGrid(piece) {
    const board = document.getElementById('board');

    const boardRect = board.getBoundingClientRect();
    const pieceRect = piece.getBoundingClientRect();

    if (!isPieceOverTheBoard(pieceRect, boardRect)) {
        return;
    }

    const visibleLeft = pieceRect.left + pieceOffset;
    const visibleTop = pieceRect.top + pieceOffset;

    let snappedX = Math.round((visibleLeft - boardRect.left) / pieceSize) * pieceSize;
    let snappedY = Math.round((visibleTop - boardRect.top) / pieceSize) * pieceSize;
    
    const maxPieceLeft = boardWidth - pieceSize;
    const maxPieceTop = boardHeight - pieceSize;

    snappedX = Math.max(0, Math.min(snappedX, maxPieceLeft));
    snappedY = Math.max(0, Math.min(snappedY, maxPieceTop));

    const targetLeft = boardRect.left + snappedX;
    const targetTop = boardRect.top + snappedY;

    const physicalLeft = targetLeft - pieceOffset;
    const physicalTop = targetTop - pieceOffset;

    if (getPieceInPosition(targetLeft, targetTop)) {
        return;
    }

    if (isPositionValid(piece, targetLeft, targetTop, boardRect)) {
        piece.style.left = `${physicalLeft}px`;
        piece.style.top = `${physicalTop}px`;
    }
}