'use strict';

var gElCanvas;
var gCtx;


function onInit(){
    console.log('ready')
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImage();
}


function drawImage() {
    console.log('hi');
    var img = new Image();
    img.src= getImgSrc();
    img.onload = () => {
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    };
  }