
var gKeywords = { 'VIP': 1, 'funny puk': 1 }

var gImages = [
    { id: 1, url: 'imgs/meme-imgs/1.jpg', keywords: ['VIP'] },
    { id: 2, url: 'imgs/meme-imgs/2.jpg', keywords: ['animals'] }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Holla!',
            size: 40,
            align: 'left',
            color: 'white',
            font: 'impact',
            isSelected: true,
            pos: {
                x: 200,
                y: 100
            }
        },

    ]
}

function getSelectedIdx() {
    return gMeme.selectedLineIdx;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLines() {
    return gMeme.lines;
}

function changeText(newText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newText;
}

function align(dir) {
    const currLine = gMeme.selectedLineIdx;
    const canWidth = gElCanvas.width
    const txtWidth = getTxtWidth()
    // gCtx.save();
    switch (dir) {

        case 'left':
            gMeme.lines[currLine].pos.x = 0;
            break;
        case 'right':
            gMeme.lines[currLine].pos.x = canWidth - txtWidth;
            break;
        default:
            gMeme.lines[currLine].pos.x = (canWidth / 2) - (txtWidth / 2);
            break;
    }
    // gCtx.restore()
    // renderMeme();

}

function fontSizing(sign) {
    var currLineSize = gMeme.lines[gMeme.selectedLineIdx].size;

    if (sign === 'plus' && currLineSize < 70) {
        gMeme.lines[gMeme.selectedLineIdx].size += 5

    } else if (sign === 'minus' && currLineSize > 20) {
        gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }
}

function changeFill(newColor) {
    console.log('newColor', newColor);
    gMeme.lines[gMeme.selectedLineIdx].color = newColor;
    renderMeme();
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function changeLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx += 1
    // console.log('Meme.selectedLineIdx', gMeme.selectedLineIdx);
}

function moveLine(dir) {
    const currLine = gMeme.selectedLineIdx;
    // let currY = gMeme.lines[currLine].pos.y

    gMeme.lines[currLine].pos.y += (dir === "up") ? -5 : +5;
    // console.log('gMeme.lines[selectedLineIdx].pos.y', gMeme.lines[currLine].pos.y);
}

function setPickedImg(id) {
    gMeme.selectedImgId = id;
}

function getImgSrc() {
    var imIdx = _getImgIdx(gMeme.selectedImgId);
    var selectedImg = gImages[imIdx].url;
    // console.log('selectedImg', selectedImg); 
    return selectedImg;
}

function deleteLine() {
    let idx = gMeme.selectedLineIdx;
    gMeme.lines.splice(idx, 1);
    gMeme.selectedLineIdx = 0;
}

function createLine() {
    // const xCenter = (gElCanvas.width/2)-(currLine.txt.length*10)
    const initPos = _getInitialTxtPos()
    var line = {
        txt: 'Holla!',
        size: 40,
        align: 'left',
        color: 'white',
        font: 'impact',
        isSelected: true,
        pos: initPos
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getTxtWidth(txt) {
    if (!txt) txt = gMeme.lines[gMeme.selectedLineIdx].txt;
    // const txt = gMeme.lines[gMeme.selectedLineIdx].txt;
    const txtWidth = gCtx.measureText(txt).width;
    return txtWidth;
}

function _getImgIdx(imgId) {
    return gImages.findIndex(img => img.id === imgId);
}

function _getInitialTxtPos() {
    var txtWidth = getTxtWidth('Holla!');
    var linesLen = gMeme.lines.length;
    var canWidth = gElCanvas.width;
    var canHeight = gElCanvas.height;
    var x = (canWidth / 2) - (txtWidth / 2);
    var y;

    if (linesLen === 0) {
        // x = (canWidth / 2) - (txtWidth / 2) - 35;
        y = 70;
    } else if (linesLen === 1) {
        y = canHeight - 50;
    } else if (linesLen > 1) {
        y = (canHeight / 2) + 20;
    }
    return { x, y }
}