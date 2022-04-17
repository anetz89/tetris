const BOARDWIDTH = 15;
const BOARDHEIGHT = 20;
const TILESIZE = 20;
const COLORS = ['green', 'yellow', 'red', 'blue', 'pink', 'purple'];
const TYPES = ['bar', 'hookleft', 'hookright', 'block', 'stepup', 'stepdown', 'nose'];
let SPEED = 500;

let board = initializeBoard(BOARDWIDTH, BOARDHEIGHT);
let currentRow, currentCol, currentColor, currentType, currentRotation;
createCurrent();

printBoard(board);

const game = setInterval(tick, SPEED);


function tick() {
    if (currentRow + 1 == BOARDHEIGHT || board[currentRow + 1][currentCol].status == 2) {
        if (currentRow === 0) {
            clearInterval(game);
            document.getElementById('gameover').style.display = 'block';
            return;
        }
        fixCurrent();
        createCurrent();
    }
    currentRow +=1;
    if (currentRow) {
        clearPrevious();
    }
    setNext();

    printBoard(board);
}

function createCurrent() {
    currentRow = -1;
    currentCol = Math.floor(Math.random() * BOARDWIDTH);
    currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    currentType = TYPES[Math.floor(Math.random() * TYPES.length)];
    currentRotation = Math.floor(Math.random() * 4);
}

function clearPrevious() {
    const positions = getPositions(true);
    positions.forEach(function(position) {
        board[position[0]][position[1]] = getTile();
    });
}
function setNext() {
    const positions = getPositions();
    positions.forEach(function(position) {
        board[position[0]][position[1]] = getTile(1, currentColor);
    });
}

function fixCurrent() {
    const positions = getPositions();
    positions.forEach(function(position) {
        board[position[0]][position[1]] = getTile(2, currentColor);
    });
}

function getPositions(isPrevious) {
    if (isPrevious) {
        return [[currentRow - 1, currentCol]];
    }
    return [[currentRow, currentCol]];
}



function initializeBoard(width, height) {
    let board = [];

    for(let i = 0; i < height; i += 1) {
        let row = [];
        for(let j = 0; j < width; j += 1) {
            row.push(getTile());
        }
        board.push(row);
    }

    return board;
}
function getTile(status, color) {
    return {
        status: status || 0,
        color: color || null
    };
}


function printBoard(board) {
    const boardCanvas = document.getElementById('board');
    boardCanvas.style.width = (BOARDWIDTH * TILESIZE) + 'px';
    boardCanvas.innerHTML = '';

    board.forEach(function (row) {
        let rowString = '<div class="row">';
        row.forEach(function(tile) {
            rowString = rowString += getTileCanvas(tile);
        });
        boardCanvas.innerHTML += rowString + '</div>';
    });
}
function getTileCanvas(tile) {
    let tileCanvas = '<div class="tile" style="SIZE; COLOR">&nbsp;</div>';

    tileCanvas = tileCanvas.replace('SIZE', 'width:' + TILESIZE + 'px;height:' + TILESIZE + 'px')


    if (tile.status) {
        return tileCanvas.replace('COLOR', 'background-color:' + tile.color);
    }
    return tileCanvas.replace('COLOR', '');
}

