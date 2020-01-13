let rose;

class Rose {
  constructor(nn, dd) {
    this.n = nn;
    this.d = dd;
  }
  setN(nn) {
    this.n = nn;
  }
  setD(dd) {
    this.d = dd;
  }
  showN() {
    let currentN = this.n;
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("n = " + currentN, 10, 80, 770, 80)
  }
  showD() {
    let currentD = this.d;
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text("d = " + currentD, 10, 110, 770, 80)
  }
  show() {
    rose.showN();
    rose.showD();
    var red = random(1, 255);
    var green = random(1, 255);
    var blue = random(1, 255);
    var k = this.n / this.d;
    push();
    translate(width / 2, height / 2);
    beginShape();
    stroke(red, green, blue);
    noFill();
    strokeWeight(1);
    for (var a = 0; a < TWO_PI * reduceDenominator(this.n, this.d); a += 0.02) {
      var r = 165 * cos(k * a);
      var x = r * cos(a);
      var y = r * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    noLoop();
  }
}

function setup() {
  createCanvas(800, 600);
  rose = new Rose(2, 8);
}

function draw() {
  fill("blue")
  rect(16, 16, 768, 568);
  fill(41)
  rect(20, 20, 760, 560);
  let title = 'Mathematical Roses';
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text(title, 10, 40, 770, 80);
  rose.show();
}

function mouseClicked() {
  rose.setN(Math.floor(Math.random() * 10 + 1));
  rose.setD(Math.floor(Math.random() * 12 + 1));
  redraw();
}

function reduceDenominator(n, d) {
  function rec(a, b) {
    return b ? rec(b, a % b) : a;
  }
  return d / rec(n, d);
}

