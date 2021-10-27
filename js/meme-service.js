
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
            color: 'black',
            font: 'impact',
            pos: {
                x: 200,
                y: 100
            }
        },

    ]
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

function fontSizing(sign) {
    var currLineSize = gMeme.lines[gMeme.selectedLineIdx].size;

    if (sign === 'plus' && currLineSize < 80) {
        gMeme.lines[gMeme.selectedLineIdx].size += 5

    } else if (sign === 'minus' && currLineSize > 20) {
        gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }
}

function changeLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx += 1
    console.log('Meme.selectedLineIdx', gMeme.selectedLineIdx);
}

function moveLine(dir) {
    const currLine = gMeme.selectedLineIdx;
    // let currY = gMeme.lines[currLine].pos.y

    gMeme.lines[currLine].pos.y += (dir === "up") ? -5 : +5;
    console.log('gMeme.lines[selectedLineIdx].pos.y', gMeme.lines[currLine].pos.y);
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

function _getImgIdx(imgId) {
    return gImages.findIndex(img => img.id === imgId);
}

function createLine() {
    // const xCenter = (gElCanvas.width/2)-(currLine.txt.length*10)

    var line = {
        txt: 'Holla Holla!',
        size: 40,
        align: 'left',
        color: 'black',
        font: 'impact',
        pos: {
            x: 150,
            y: 450
        }
    }
    gMeme.lines.push(line);
}