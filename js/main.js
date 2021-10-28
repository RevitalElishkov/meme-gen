'use strict';

var gElCanvas;
var gCtx;
var gIsDownload = false;


function onInit() {
    console.log('ready')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImage();
    // renderMeme()
}

function onFontSizing(sign) {
    fontSizing(sign);
    renderMeme()
}

function onSetPickedImg(id) {
    setPickedImg(id);
    drawImage();
}

function onMoveLine(dir) {
    moveLine(dir)
    renderMeme();
}

function onChangeLine() {
    changeLine();
    renderMeme();

}

function onCreateLine() {
    createLine();
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
}

function renderMeme() {
    gCtx.save();
    var img = new Image();
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        var lines = getLines();
        lines.forEach((line, idx) => {
            var selectedIdx = getSelectedIdx()
            if (selectedIdx === idx && !gIsDownload) drawRect(line);
            drawText(line)
        })
    };
    gCtx.restore();
}

function drawImage() {
    // console.log('hi');
    var img = new Image();
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        // drawText()
    };
}

function onChangeFill(color) {
    // console.log('ev', ev);
    // var fillColor = document.querySelector('.fillColor').value;
    changeFill(color);
    // ev.stopPropagation();
    // console.log('fillColor', fillColor);
    // renderMeme;
}

function onChangeFont(font) {
    changeFont(font);
    renderMeme();
}

function onChangeText() {
    var newText = document.querySelector('.text-line').value;
    changeText(newText);
    renderMeme();
}

function onAlign(dir) {
    align(dir);
    renderMeme();
}

//drawText(text, x, y)
function drawText(currLine) {
    if (!currLine) currLine = getLine();
    // console.log('currLine', currLine);
    // const xCenter = (gElCanvas.width / 2) - (currLine.txt.length * 10)
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = currLine.color;
    gCtx.font = `${currLine.size}px ${currLine.font}`;

    gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y);
    gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y);
}

function drawRect(currLine) {
    const width = getTxtWidth(currLine.txt) + 20
    const height = currLine.size + 20
    const x = currLine.pos.x - 30
    const y = currLine.pos.y - (height - 15)
    // console.log('x', x);
    // console.log('y', y);
    // console.log('width', width);
    // console.log('height', height);

    gCtx.beginPath();
    gCtx.rect(x, y, width + (height), height);
    gCtx.fillStyle = 'rgba(220, 220, 220, 0.562)';
    gCtx.fillRect(x, y, width + height, height);
}

function onDownloadImg(elLink) {
    gIsDownload = true;
    renderMeme();
    // downloadImg(elLink)
    //to fix download with rect
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    gIsDownload = false;

}

// function downloadImg(elLink){
//     var imgContent = gElCanvas.toDataURL('image/jpeg')
//     elLink.href = imgContent
//     gIsDownload = false;
// }