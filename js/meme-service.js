
var gKeywords = { 'VIP': 1, 'funny puk': 1 }

var gImages = [
    { id: 1, url: 'imgs/meme-imgs/1.jpg', keywords: ['VIP'] }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function getImgSrc() {
    var imIdx = _getImgIdx(1)
    var selectedImg = gImages[imIdx].url
    // console.log('selectedImg', selectedImg); 
    return selectedImg
}

function _getImgIdx(imgId) {
    return gImages.findIndex(img => img.id === imgId)
}