'use strict';

const KEY = 'myMemes'
var gKeywords = { 'VIP': 1, 'funny puk': 1 }
var gUserMemes = [];
var gStickers = [
    { id: 1, url: 'imgs/stickers/sticker-1.png', pos: { x: 0, y: 0 }, isDrag: false },
    { id: 2, url: 'imgs/stickers/sticker-2.png', pos: { x: 0, y: 0 }, isDrag: false },
    { id: 3, url: 'imgs/stickers/sticker-3.png', pos: { x: 0, y: 0 }, isDrag: false },
    { id: 4, url: 'imgs/stickers/sticker-4.png', pos: { x: 0, y: 0 }, isDrag: false },
    { id: 5, url: 'imgs/stickers/sticker-5.png', pos: { x: 0, y: 0 }, isDrag: false }
];

var gImages = [
    { id: 1, url: 'imgs/meme-imgs/1.jpg', keywords: ['VIP'] },
    { id: 2, url: 'imgs/meme-imgs/2.jpg', keywords: ['animals', 'dog'] },
    { id: 3, url: 'imgs/meme-imgs/3.jpg', keywords: ['animals', 'dog', 'baby'] },
    { id: 4, url: 'imgs/meme-imgs/4.jpg', keywords: ['animals'] },
    { id: 5, url: 'imgs/meme-imgs/5.jpg', keywords: ['animals'] },
    { id: 6, url: 'imgs/meme-imgs/6.jpg', keywords: ['animals'] },
    { id: 7, url: 'imgs/meme-imgs/7.jpg', keywords: ['animals'] },
    { id: 8, url: 'imgs/meme-imgs/8.jpg', keywords: ['animals'] },
    { id: 9, url: 'imgs/meme-imgs/9.jpg', keywords: ['animals'] },
    { id: 10, url: 'imgs/meme-imgs/10.jpg', keywords: ['animals'] },
    { id: 11, url: 'imgs/meme-imgs/11.jpg', keywords: ['animals'] },
    { id: 12, url: 'imgs/meme-imgs/12.jpg', keywords: ['animals'] },
    { id: 13, url: 'imgs/meme-imgs/13.jpg', keywords: ['animals'] },
    { id: 14, url: 'imgs/meme-imgs/14.jpg', keywords: ['animals'] },
    { id: 15, url: 'imgs/meme-imgs/15.jpg', keywords: ['animals'] },
    { id: 16, url: 'imgs/meme-imgs/16.jpg', keywords: ['animals'] },
    { id: 17, url: 'imgs/meme-imgs/17.jpg', keywords: ['animals'] },
    { id: 18, url: 'imgs/meme-imgs/18.jpg', keywords: ['animals'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
    lines: [],
    stickers: []
}


function setSticker(idx) {
    const sticker = gStickers[idx];
    gMeme.stickers.push(sticker);
}

function getStickersInLine() {
    return gMeme.stickers;
}

function getStickerSrc(idx) {
    return gMeme.stickers[idx].url;
}

function clearStickers() {
    gMeme.stickers = [];
}

function clearLines() {
    gMeme.lines = [];
}

function saveMeme() {
    var meme = getMemeUrl();
    gUserMemes.push(meme);
    _savedMemesToStorage();
}

function getSavedMemes() {
    var memes = _loadSavedMemes();
    if ((!memes || !memes.length)) memes = [];
    gUserMemes = memes;
}

function getMemes() {
    return gUserMemes;
}

function getStickers() {
    return gStickers;
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

function getImgs() {
    return gImages;
}

function changeTxt(newTxt) {
    var line = getLine();
    line.txt = newTxt;
}

function align(dir) {
    const currLine = gMeme.selectedLineIdx;
    const canWidth = gElCanvas.width
    const txtWidth = getTxtWidth()

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
}

function fontSizing(sign) {
    var line = getLine();
    var currLineSize = line.size;

    if (sign === 'plus' && currLineSize < 70) {
        line.size += 5;
    } else if (sign === 'minus' && currLineSize > 20) {
        line.size -= 5;
    }
}

function changeFill(newColor) {
    var line = getLine();
    line.fillColor = newColor;
    renderMeme();
}

function changeOutline(newColor) {
    var line = getLine();
    line.strokeColor = newColor;
    renderMeme();
}

function changeFont(font) {
    var line = getLine();
    line.font = font;
}

function changeLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx += 1
}

function moveLine(dir) {
    var line = getLine();
    line.pos.y += (dir === "up") ? -5 : +5;
}

function setPickedImg(id) {
    gMeme.selectedImgId = id;
}

function getImgSrc() {
    var imIdx = _getImgIdx(gMeme.selectedImgId);
    var selectedImg = gImages[imIdx].url;
    return selectedImg;
}

function deleteLine() {
    let idx = gMeme.selectedLineIdx;
    gMeme.lines.splice(idx, 1);
    gMeme.selectedLineIdx = 0;
}

function createLine() {
    const initPos = _getInitialTxtPos()
    var line = {
        txt: 'Holla!',
        size: 40,
        align: 'left',
        fillColor: 'white',
        strokeColor: 'black',
        font: 'impact',
        isSelected: true,
        pos: initPos,
        isDrag: false
    }
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getTxtWidth(txt) {
    if (!txt) txt = gMeme.lines[gMeme.selectedLineIdx].txt;
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
        x = (canWidth / 2) - 47;
        y = 70;
    } else if (linesLen === 1) {
        y = canHeight - 50;
    } else if (linesLen > 1) {
        y = (canHeight / 2) + 20;
    }
    return { x, y }
}

function _loadSavedMemes() {
    var memes = loadFromStorage(KEY);
    return memes;
}

function _savedMemesToStorage() {
    saveToStorage(KEY, gUserMemes)
}

// drag and drop 
function islineClicked(clickedPos) {
    var lines = getLines();
    for (var i = 0; i < lines.length; i++) {
        var currline = lines[i];
        var txt = currline.txt
        var txtWidth = getTxtWidth(txt)
        var currPos = currline.pos
        var distance = Math.sqrt((currPos.x - clickedPos.x) + txtWidth + (currPos.y - clickedPos.y) + txtWidth)
        if (distance <= txtWidth) {
            gMeme.selectedLineIdx = i
            return true;
        }
    }
    let selectedLine = getLine();
    return distance <= getTxtWidth(selectedLine.txt)
}

function setlineDrag(isDrag) {
    var line = getLine();
    line.isDrag = isDrag
}

function moveline(dx, dy) {
    var line = getLine();
    line.pos.x += dx
    line.pos.y += dy
}

// drag and drop sticker

// function isStickerClicked(clickedPos) {
//     var stickers = getStickersInLine()
//     for (var i = 0; i < stickers.length; i++) {
//         var currSticker = stickers[i];
//         var currPos = currSticker.pos
//         var distance = Math.sqrt((currPos.x - clickedPos.x) + 100 + (currPos.y - clickedPos.y) + 100)
//         if (distance <= 100) {
//             gMeme.selectedLineIdx = i
//             return true;
//         }
//     }
//     // let selectedSticker =  getSticker();
//     return distance <= 100
// }

// function moveSticker(dx, dy) {
//     var sticker = getSticker();
//     sticker.pos.x += dx
//     sticker.pos.y += dy
// }

// function setStickerDrag(isDrag) {
//     var sticker = getSticker();
//     sticker.isDrag = isDrag
// }

// function getSticker(){
//     return gMeme.stickers[gMeme.selectedStickerIdx]
// }
