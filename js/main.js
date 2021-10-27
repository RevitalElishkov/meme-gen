'use strict';

var gElCanvas;
var gCtx;


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

function onChangeLine() {
    changeLine()
}

function onCreateLine() {
    createLine();
    renderMeme();
}

function renderMeme() {

    var img = new Image();
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        var lines = getLines();
        lines.forEach(line => {
            drawText(line)
        })
    };
}

function drawImage() {
    // console.log('hi');
    var img = new Image();
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText()
    };
}

function onChangeText() {
    var newText = document.querySelector('.text-line').value;
    changeText(newText);
    renderMeme()
}

//drawText(text, x, y)
function drawText(currLine) {
    if (!currLine) currLine = getLine();
    // console.log('currLine', currLine);
    // const xCenter = (gElCanvas.width / 2) - (currLine.txt.length * 10)
    
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = currLine.color;
    gCtx.fillStyle = 'white';
    gCtx.font = `${currLine.size}px ${currLine.font}`;
   
    gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y);
    gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y);
}