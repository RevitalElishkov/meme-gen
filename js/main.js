'use strict';

var gElCanvas;
var gCtx;
var gIsDownload = false;

function onInit() {
    console.log('ready')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery();
    drawImage();
    getSavedMemes();
    // renderMeme()
}

function onOpenGallery() {
    clearLines();
    openPage('gallery');
}

function onOpenMemes() {
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
    var strHtmls;
    if (!memes || !memes.length) {
        strHtmls = `you didn't saved memes yet 🙃`
    } else {
        console.log('memes', memes);
        var strHtmls = memes.map(function (meme) {
            return `<img src="${meme}" />`
        })

        strHtmls.join('');
    }
    document.querySelector('.memes').innerHTML = strHtmls

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
    
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = currLine.strokeColor;
    gCtx.fillStyle = currLine.fillColor;
    gCtx.font = `${currLine.size}px ${currLine.font}`;

    gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y);
    gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y);
}

function drawRect(currLine) {
    const height = currLine.size + 20
    const y = currLine.pos.y - (height - 15)

    gCtx.beginPath();
    gCtx.rect(0, y, gElCanvas.width, height);
    gCtx.fillStyle = 'rgba(220, 220, 220, 0.562)';
    gCtx.fillRect(0, y, gElCanvas.width, height);
}

function onDownloadImg() {
    gIsDownload = true;
    renderMeme();
    var elLink = document.querySelector('.down')

    setTimeout(() => {
        elLink.click();
    }, 500);
}

function downloadImg(elLink) {
    var imgContent = getMemeUrl()
    elLink.href = imgContent
    gIsDownload = false;
}

function getMemeUrl() {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    return imgContent;
}

function onShareMeme() {
    gIsDownload = true;
    renderMeme();
    setTimeout(() => {
        uploadImg()
    }, 500);
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}


