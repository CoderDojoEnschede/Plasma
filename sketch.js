const PI = Math.PI;
const pal = [128];


// Opdracht 1
const kleuren = [0, 0, 0];
const richting = [1, 1, 1];
const W = 320;
const H = 240;
const schaal = 1;
const breedte = W / schaal;
const hoogte = H / schaal;
const factor = 32.0;
const startWaarde = 128;
let buffer;


// Opdracht 2
function f1(x) {
  return startWaarde * 1;
}

function f2(y) {
  return startWaarde + startWaarde * 1;
}

function f3(x, y) {
  return startWaarde + startWaarde * 1;
}

function setup() {
  pixelDensity(1);
  createCanvas(W, H);
  frameRate(60);
  background(color(255, 255, 255));
  fill('rgba(0, 0, 0, 0.25)');
  stroke('rgba(255, 255, 255, 0.25)');
  strokeWeight(3);
  textSize(40);
  buffer = [breedte * hoogte];
  for (let x = 0; x < breedte; x++) {
    for (let y = 0; y < hoogte; y++) {
      buffer[x + y * breedte] = (startWaarde + f1(x) + f2(y) + f3(x, y)) / 4;
    }
  }
}

function omhoogOfOmlaag(index) {
  richting[index] =
    kleuren[index] > 128 ? -1 : kleuren[index] < 0 ? 1 : richting[index];
  kleuren[index] += richting[index];
}


// Opdracht 3
function s1(i) {
  return 1;
}
function s2(i) {
  return 1;
}
function s3(i) {
  return 1;
}

function kleurpaletMaken() {
  for (let i = 0; i < 128; i++) {
    pal[i] = color(
      kleuren[0] + s1(i) * 128,
      kleuren[1] + s2(i) * 128,
      kleuren[2] + s3(i) * 128
    );
  }
}

function pixelsTekenen() {
  let x;
  let y;
  for (let i = 0; i < buffer.length; i++) {
    const col = pal[(buffer[i] + frameCount) & 127];
    x = i % breedte;
    y = Math.floor(i / breedte);
    let index = y * breedte * 4 * schaal * schaal + x * 4 * schaal;
    pixels.set(col.levels, index);
  }
}


// Opdracht 4
let textX=-50;
let textY=-100;
let textI=0;

function draw() {
  omhoogOfOmlaag(0);
  omhoogOfOmlaag(1);
  omhoogOfOmlaag(2);
  kleurpaletMaken();
  loadPixels();
  pixelsTekenen();
  updatePixels();
  
  // Opdracht 5
  text('CoderDojo', textX+sin(textI/60)*50, textY+cos(textI/60)*25);
  textI++;
}
