'use strict';

var gElCanvas;
var gCtx;
var gIsDownload = false;
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    console.log('ready')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery();
    getSavedMemes();
    addListeners()
    // renderStickers();
    // renderMeme()
}

function onOpenGallery() {
    // clearStickers();
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
    renderMeme();
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
        var strHtmls = memes.map(function (meme) {
            return `<img class="imges" src="${meme}" />`
        })
        strHtmls = strHtmls.join('');
    }
    document.querySelector('.memes').innerHTML = strHtmls
}

function renderGallery() {
    const imgs = getImgs();

    const strHtmls = imgs.map(function (img) {
        return `<img src="${img.url}" onclick="onSetPickedImg(${img.id})" />`
    })

    document.querySelector('.gallery').innerHTML = strHtmls.join('');
}

// function renderStickers() {
//     const stickers = getStickers();
//     const strHtmls = stickers.map(function (sticker, idx) {
//         return `<img class="sticker" src="${sticker.url}" onclick="onSetSticker(${idx})" />`

//     })
//     document.querySelector('.stickers').innerHTML = strHtmls.join('');
// }

// function onSetSticker(idx) {
//     setSticker(idx);
//     renderMeme;
//     renderMeme;
// }


function openPage(page) {

    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = (page === 'gallery') ? 'block' : 'none';

    var elEditor = document.querySelector('.editor-container');
    elEditor.style.display = (page === 'editor') ? 'block' : 'none';

    var elMemes = document.querySelector('.memes');
    elMemes.style.display = (page === 'memes') ? 'block' : 'none';
    gUserImg.isUpload = false;
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
    var img;
    if (gUserImg.isUpload === true) {
        console.log('hi');
        img = gUserImg.img
        console.log('img', img);
    } else {
        img = new Image();
        img.src = getImgSrc();
    }
    // img.onload = () => {
    //     console.log('img', img);
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    var lines = getLines();
    if (!lines || !lines.length) createLine();

    lines.forEach((line, idx) => {
        var selectedIdx = getSelectedIdx()
        if (selectedIdx === idx && !gIsDownload) drawRect(line);
        drawTxt(line);
    })
    // var stickers = getStickersInLine();
  
    // console.log('stickers', stickers);
    // if (!stickers || !stickers.length) return;
    

    // stickers.forEach((sticker, idx) => {
    //     var sticker = new Image();
    //     sticker.src = stickers[idx].url;
    //     gCtx.drawImage(sticker, 0, 0, 100, 100);

    // });
    
    // }
    gCtx.restore();
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

function onChangeTxt() {
    var newText = document.querySelector('.text-line').value;
    changeTxt(newText);
    renderMeme();
}

function cleanPlaceholder() {
    document.querySelector('.text-line').value = '';
}

function onAlign(dir) {
    align(dir);
    renderMeme();
}

function drawTxt(currLine) {
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

// drag and drop line

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)

    if (!islineClicked(pos)) return
    // if (islineClicked(pos)) {
        setlineDrag(true)
    // } else if (isStickerClicked(pos)) {
    //     setStickerDrag(true)
    // }
    gStartPos = pos
    document.querySelector('.canvas-container').style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getLine();
    // const sticker = getSticker();
   
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveline(dx, dy);
        renderMeme();
    }
    // } else if (sticker.isDrag) {
    //     const pos = getEvPos(ev)
    //     const dx = pos.x - gStartPos.x
    //     const dy = pos.y - gStartPos.y
    //     gStartPos = pos
    //     moveSticker(dx, dy);
    //     renderMeme();
    // }
}

function onUp() {
    setlineDrag(false)
    // setStickerDrag(false)
    document.querySelector('.canvas-container').style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}