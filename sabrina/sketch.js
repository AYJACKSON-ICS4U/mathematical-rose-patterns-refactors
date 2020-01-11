// Daniel Shiffman
// http://codingtra.in
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
// Object Oriented Refactor by Sabrina Button 

// Function for creating a new Rhodonea
var Rhodonea = function() {
    // Denominator and numerator variables to later define k
    this.d = 8;
    this.n = 10;

    /* Refactor additions for adding oscillations */
    this.ampSlider;
    this.perSlider;
    this.color;
    this.startAngle = 0;
    this.amplitude = 50;
    this.period = 10000;
}

// Update the Rhodonea's oscillation
Rhodonea.prototype.update = function() {
  // Set value of period to the corresponding slider value
  this.period = this.perSlider.value();
  // Increment the start angle 
  this.startAngle += TWO_PI / this.period;
};

// Draws the Rhodonea
Rhodonea.prototype.draw = function(){
  // Original code from draw to setup the location of the Rhodonea and begin the shape
  push();
  translate(width / 2, height / 2);
  beginShape();
  // Adding color 
  stroke(this.color);
  noFill();
  strokeWeight(1);

  /*Refactored code begins */
  this.amplitude = this.ampSlider.value();
 
  // Set angle to angle on rose
  var angle = this.startAngle;
  var deno = sin(angle) * this.amplitude;

  deno = parseFloat(deno.toFixed(2))
  this.d = deno;
  var k = this.n / this.d;

  // For loop from the original draw function
  for (var a = 0; a < TWO_PI * Math.abs(this.d); a += 0.02) {
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
    /* Create a slider to edit amplitude */
    this.ampSlider = createSlider(10,50,5,10);
    this.ampSlider.input(draw);

    /* Create a slider to edit period */
    this.perSlider = createSlider(500,10000,19,500);
    this.perSlider.input(draw);

    /* Added Code */
    // Generate a random RGB value
    this.color = color(random()*256,random()*256,random()*256);
}

// Create a new Rhodonea object
var rose = new Rhodonea();

function setup() {
    createCanvas(windowWidth - 50, windowHeight - 70);
    // Call the initialize function to create a Slider for the Rhodonea and establish color
    rose.initialize();
}

function draw() {
  // Show a few titles
  background(0);
  fill(255);
  stroke(255);
  textSize(20);
  text("Oscillating Rhodonea",10,40);
  textSize(12);
  text("Sabrina Button 2019", 10, 70);
  // Update and draw the rose
  rose.update();
  rose.draw();
  text("Adjust Amplitude ( " + rose.amplitude + " )", 0,  height -  10);
  text("Adjust Period ( " + rose.period + " )", 140,  height -  10);
}
