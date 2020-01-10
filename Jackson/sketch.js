var nCount = 0, dCount = 1, nxtSet;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  nxtSet = createButton('Next Set');
  nxtSet.mousePressed(rst);
  colorMode(HSL);
  rectMode(RADIUS);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

class Rose {
  constructor(xo, yo, n, d, hue) {
    this.xOrigin = xo;
    this.yOrigin = yo;
    this.numerate = n;
    this.denominate = d;
    this.constant = n/d;
    this.startHue = hue % 360;
    this.saturation = "100";
    this.lightness = "50";
    if (n/d < 1) {
      this.constant = this.constant.toPrecision(3);
    } else {
      this.constant = this.constant.toPrecision(4);
    }
  }

  draw() {
    var loop = reduceDenominator(this.numerate, this.denominate);
    var gcd = simplify(this.numerate, this.denominate);
    this.numerate = gcd[0];
    this.denominate = gcd[1];
    var p = oddOrEven(this.constant, this.numerate, this.denominate);
    textAlign(LEFT, CENTER);
    strokeWeight(window.innerWidth / window.innerHeight * 2);
    for (var a = 0; a < TWO_PI * loop / p; a += PI / 2000) {
      var hue = degrees(a) * p / loop + this.startHue;
      hue %= 360;
      var r = window.innerHeight * cos(this.constant * a) / 5;
      var x = r * cos(a) + this.xOrigin;
      var y = r * sin(a) + this.yOrigin;
      stroke(hue, this.saturation, this.lightness);
      point(x, y);
    }
  }
}

function reduceDenominator(numerator, denominator) {
  function rec(a, b) {
    return b ? rec(b, a % b) : a;
  }
  return denominator / rec(numerator, denominator);
}

function simplify(numerator, denominator){
  var gcd = function gcd(a, b){
    return b ? gcd(b, a % b) : a;
  };
  gcd = gcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

function oddOrEven(c, n, d) {
  if (c % 2 === 1 || n % 2 === 1 && d % 2 === 1) {
    return 2;
  } else {
    return 1;
  }
}

function drawGradient() {
  var l = 20;
  var ry =  window.innerHeight/2;
  var h = random(0, 360);
  for (var rx = window.innerWidth/2; rx > 0; rx--) {
    fill(h, 100, l);
    noStroke();
    push();
    translate(width / 2, height / 2);
    rect(0, 0, rx, ry);
    pop();
    l = l - 50 / window.innerHeight;
    if (ry > 0) {
      ry--;
    }
  }
}

function rst() {
  loop();
}

function draw() {
  nxtSet.position(window.innerWidth / 1.11, window.innerHeight / 2);
  nxtSet.style('background-color', 'hsl(' + random(0, 360) + ', 100%, 50%)');
  drawGradient();
  var rose = [];
  for (var yPos = window.innerHeight / 4; yPos <= window.innerHeight * 3 / 4; yPos += window.innerHeight / 2) {
    for (var xPos = window.innerWidth / 10; xPos <= window.innerWidth * 9 / 10; xPos += window.innerWidth / 5) {
      nCount++;
      if (nCount === 21) {
        nCount = 1;
        dCount++;
      } if (dCount === 21) {
        dCount = 1;
      }
      rose.push(new Rose(xPos, yPos, nCount, dCount, Math.floor(Math.random() * 360)));
    }
  }
  for (var num = 0; num < rose.length; num++) {
    rose[num].draw();
  }
  noLoop();
}
