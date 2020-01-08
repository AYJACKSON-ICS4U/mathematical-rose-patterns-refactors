function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  let reset = createButton('Reset');
  reset.position(20, 24);
  reset.style('padding', '10px');
  reset.style('background-color', 'hsl(' + random(0, 360) + ', 100%, 50%)');
  reset.style('border', 'outset');
  reset.mousePressed(rst);
  colorMode(HSL);
  rectMode(RADIUS);
}

class Rose {
  constructor(xo, yo, n, d, hue) {
    this.xOrigin = xo;
    this.yOrigin = yo;
    this.numerate = n;
    this.denominate = d;
    this.constant = n/d;
    this.constant = this.constant.toPrecision(7);
    this.hue = hue % 360;
    this.saturation = "100";
    this.lightness = "50";
  }

  draw() {
    textAlign(LEFT, CENTER);
    textSize(20);
    fill(0);
    text("N = " + this.numerate, -600, -20);
    text("D = " + this.denominate, -600, 0);
    text("K = " + this.constant, -600, 20);
    strokeWeight(8);
    var int = random(0.005, 4);
    var loop = reduceDenominator(this.numerate, this.denominate);
    for (var a = 0; a < TWO_PI * loop; a += 0.0002 * loop) {
      if (this.hue >= 360) {
        this.hue = 0;
      }
      var r = 300 * cos(this.constant * a);
      var x = r * cos(a) + this.xOrigin;
      var y = r * sin(a) + this.yOrigin;
      stroke(this.hue, this.saturation, this.lightness);
      point(x, y);
      this.hue += int;
    }
  }
}

function reduceDenominator(numerator, denominator) {
  function rec(a, b) {
    return b ? rec(b, a % b) : a;
  }
  return denominator / rec(numerator, denominator);
}

function drawGradient() {
  var l = 20;
  var ry =  window.innerHeight/2;
  var h = random(0, 360);
  for (var rx = window.innerWidth/2; rx > 0; rx--) {
    fill(h, 100, l);
    noStroke();
    rect(0, 0, rx, ry);
    l = l + 50 / window.innerHeight;
    if (ry > 0) {
      ry--;
    }
  }
}

function rst() {
  loop();
}

function draw() {
  translate(width / 2, height / 2);
  drawGradient();
  var rose1 = new Rose(0, 0, Math.ceil(Math.random() * 20), Math.ceil(Math.random() * 20), Math.floor(Math.random() * 360));
  rose1.draw();
  noLoop();
}
