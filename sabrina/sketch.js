// Daniel Shiffman
// http://codingtra.in
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
// Object Oriented Refactor by Sabrina Button 

// Function for creating a new Rhodonea
var Rhodonea = function() {
    // Denominator and numerator variables to later define k
    this.d = 10;
    this.n = 5;
    // this.sliderD;
     this.sliderN;

    /* Refactor additions for adding oscillations */
    this.color;
    this.startAngle = 0;
    this.amplitude = 600;
    this.period = 500;
    this.angleVel = 0;
}

// Update the Rhodonea's oscillation
Rhodonea.prototype.update = function() {
  // Increment the start angle 
  this.startAngle += TWO_PI / this.period;
};

// Draws the Rhodonea
Rhodonea.prototype.draw = function(){
  // Original code from draw to setup the location of the Rhodonea and begin the shape
  push();
  translate(width / 2, height / 2);
  beginShape();
  stroke(this.color);
  noFill();
  strokeWeight(1);
  this.n = this.sliderN.value();

  // Set angle to angle on rose
  var angle = this.startAngle;
  var deno = sin(angle) * this.amplitude;
    
  // Increment the angle by the angle velocity
  //angle += this.angleVel;
     
      //this.n = y;
      console.log(deno / 10);
  //this.d = deno /10;
  var k = this.n / (deno / 10);
  //k = constrain(k, -100, 1);

  if (k > 7){
    k = 7;
  }
  
  for (var a = 0; a < TWO_PI * this.reduceDenominator(); a += 0.02) {
    var r = 200 * cos(k * a);
    var nx = r * cos(a);
    var ny = r * sin(a);
    vertex(nx,ny);
  }
          
  endShape(CLOSE);
  pop();
}

// This defines variables color and angelVel and should be called in setup()
Rhodonea.prototype.initialize = function(){
    /* Create the sliders (from original setup function) */
    // this.sliderD = createSlider(1,20,10,1);
    this.sliderN = createSlider(1,20,10,1);
    // this.sliderD.input(draw);
    this.sliderN.input(draw);

    /* Added Code */

    // Generate a random RGB value
    this.color = color(random()*256,random()*256,random()*256);

    // Set the default angle velocity (this must be called in setup due to use of TWO_PI constant)
    this.angleVel = (TWO_PI / this.period) * 5;
}

//This is directly adapted to Object Oriented format from the original reduceDenominator function
Rhodonea.prototype.reduceDenominator = function (){
    function rec(a, b){
        return b ? rec(b, a % b) : a;
    }
    return this.d / rec(this.n, this.d);
}


var rose = new Rhodonea();

function setup() {
    createCanvas(windowWidth - 50, windowHeight - 70);
    rose.initialize();
}

function draw() {
  background(0);
  fill(255);
  stroke(255);
  textSize(20);
  text("Oscillating Rhodonea",10,40);
  textSize(12);
  text("Sabrina Button 2019", 10, 70);
  rose.update();
  rose.draw();
}
