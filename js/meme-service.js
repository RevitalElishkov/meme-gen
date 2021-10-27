
var gKeywords = { 'VIP': 1, 'funny puk': 1 }

var gImages = [
    { id: 1, url: 'imgs/meme-imgs/1.jpg', keywords: ['VIP'] }
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
                x: 250,
                y: 20
            }
        }

    ]
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function changeText(newText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newText

}

function getImgSrc() {
    var imIdx = _getImgIdx(gMeme.selectedImgId)
    var selectedImg = gImages[imIdx].url
    // console.log('selectedImg', selectedImg); 
    return selectedImg
}

function _getImgIdx(imgId) {
    return gImages.findIndex(img => img.id === imgId)
}