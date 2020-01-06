// Daniel Shiffman
// http://codingtra.in
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
// Object Oriented Refactor by Sabrina Button 

var Rhodonea = function() {
    this.d = 8;
    this.n = 5;
    this.sliderD;
    this.sliderN;
    this.color;
}

//this is directly adapted from the original draw function
Rhodonea.prototype.draw = function(){
    this.d = this.sliderD.value();
    this.n = this.sliderN.value();
    var k = this.n / this.d;
    //color feature is added
    this.color = color(random()*256,random()*256,random()*256);
    push();
  translate(width / 2, height / 2);
    beginShape();
    stroke(this.color);
    noFill();
    strokeWeight(1);
    for (var a = 0; a < TWO_PI * this.reduceDenominator(); a += 0.02) {
      var r = 200 * cos(k * a);
      var x = r * cos(a);
      var y = r * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    noLoop();
}

//this is directly adapted from the original setup for the sliders
Rhodonea.prototype.initialize = function(){
    this.sliderD = createSlider(1,20,10,1);
    this.sliderN = createSlider(1,20,10,1);
    this.sliderD.input(draw);
    this.sliderN.input(draw);
}

//this is directly adapted from the original reduce Denominator function
Rhodonea.prototype.reduceDenominator = function (){
    function rec(a, b){
        return b ? rec(b, a % b) : a;
    }
    return this.d / rec(this.n, this.d);
}

var rose = new Rhodonea();

function setup() {
    createCanvas(400, 400);
    rose.initialize();
 }

function draw() {
  background(0);
  rose.draw();
}
