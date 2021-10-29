'use strict';

var gElCanvas;
var gCtx;
var gIsDownload = false;
// var imgContent;

function onInit() {
    console.log('ready')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery();
    drawImage();
    // renderMeme()
}

function onOpenGallery() {
    clearLines();
    openPage('gallery');
}

function onOpenMemes() {
    // clearLines();
    renderUserMemes();
    openPage('memes');
}


function onSetPickedImg(id) {
    setPickedImg(id);
    openPage('editor');
    drawImage();
}

function onSaveMeme() {
    gIsDownload = true;
    renderMeme();
    setTimeout(() => {
        saveMeme();
        renderUserMemes();
        openPage('memes');
    }, 500);


}

function renderUserMemes() {
    var memes = getMemes();
    console.log('memes', memes);
    const strHtmls = memes.map(function (meme) {
        return `<img src="${meme}" />`
    })

    document.querySelector('.memes').innerHTML = strHtmls.join('');

}

function renderGallery() {
    var imgs = getImgs();

    const strHtmls = imgs.map(function (img) {
        return `<img src="${img.url}" onclick="onSetPickedImg(${img.id})" />`
    })

    document.querySelector('.gallery').innerHTML = strHtmls.join('');
}

function openPage(page) {

    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = (page === 'gallery') ? 'block' : 'none';

    var elEditor = document.querySelector('.editor-container');
    elEditor.style.display = (page === 'editor') ? 'block' : 'none';

    var elMemes = document.querySelector('.memes');
    elMemes.style.display = (page === 'memes') ? 'block' : 'none';
    gIsDownload = false;
}

function onFontSizing(sign) {
    fontSizing(sign);
    renderMeme()
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
    // console.log('hi');
    gCtx.save();
    var img = new Image();
    img.src = getImgSrc();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        var lines = getLines();
        lines.forEach((line, idx) => {
            // console.log('gIsDownload', gIsDownload);
            var selectedIdx = getSelectedIdx()
            if (selectedIdx === idx && !gIsDownload) drawRect(line);
            drawText(line)
        })
        // imgContent = gElCanvas.toDataURL('image/jpeg');

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
    changeFill(color);
}

function onChangeOutline(color) {
    changeOutline(color);
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

function cleanPlaceholder() {
    document.querySelector('.text-line').value = '';
}

function onAlign(dir) {
    align(dir);
    renderMeme();
}

function drawText(currLine) {
    if (!currLine) currLine = getLine();
    // console.log('currLine', currLine);
    // const xCenter = (gElCanvas.width / 2) - (currLine.txt.length * 10)
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = currLine.strokeColor;
    gCtx.fillStyle = currLine.fillColor;
    gCtx.font = `${currLine.size}px ${currLine.font}`;

    gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y);
    gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y);
}

function drawRect(currLine) {
    // const width = getTxtWidth(currLine.txt) + 20
    const height = currLine.size + 20
    // const x = currLine.pos.x - 30
    const y = currLine.pos.y - (height - 15)
    // console.log('x', x);
    // console.log('y', y);
    // console.log('width', width);
    // console.log('height', height);

    gCtx.beginPath();
    gCtx.rect(0, y, gElCanvas.width, height);
    // gCtx.rect(5, y, width + (height), height);
    gCtx.fillStyle = 'rgba(220, 220, 220, 0.562)';
    gCtx.fillRect(0, y, gElCanvas.width, height);
}




function onDownloadImg() {
    gIsDownload = true;
    renderMeme();
    var elLink = document.querySelector('.down')
    // setTimeout(() => {
    //     downloadImg(elLink)
    // }, 3000);
    setTimeout(() => {
        elLink.click();
    }, 500);
}

function downloadImg(elLink) {
    console.log('hi');
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    gIsDownload = false;
}

function getMemeUrl() {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    return imgContent;
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}


// function downloadImg() {
//     gIsDownload = true;
//     renderMeme();

//     setTimeout(() => {
//         check();
//     }, 5000);

// }

// function check(){
//    var elLink = document.querySelector('.down')
//     // var imgContent = gElCanvas.toDataURL('image/jpeg')
//     elLink.href = imgContent
//     gIsDownload = false;
// }

