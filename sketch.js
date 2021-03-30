let img;
let canvas;
let filter = {};
let ratio = 50;

function preload(){
    myFont = loadFont('assets/tatt.ttf')
}

function setup () {
  img = createCapture(VIDEO);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position((windowWidth - width)/2,(windowHeight - height)/2);
  img.size(width/ratio, height/ratio);
  img.hide();
  noStroke();
  fill(255);
  textFont(myFont);
  textSize(ratio);
  textAlign(LEFT, TOP);
}

function draw () {
  background(0);
  // image(img, 0, 0, width, height);
  tk();
}

function inRange (n_, min, max) {
  return (n_ - min) * (n_ - max) <= 0;
}

function pick (c_) {
  let char = 'BFGKORS';
  let b = 25;
  for (let k = 0; k <= 255; k += b) {
    if (inRange(c_, k, k + b)) { return char[Math.floor(k / (255 / b))]; }
  }
  return 'O';
}

function tk () {
  img.loadPixels();
  let i = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let c = pick ((img.pixels[i++] + img.pixels[i++] + img.pixels[i++]) / 3);
      fill(img.pixels[i - 3], img.pixels[i - 2], img.pixels[i - 1]);
      fill(255);
        
      text(c, (img.width - x - 1) * ratio, (y) * ratio);
      i++;
    }
  }
}