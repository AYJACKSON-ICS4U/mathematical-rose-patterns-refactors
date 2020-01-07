// Daniel Shiffman
// http://codingtra.in
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)
// Object Oriented Refactor by Sabrina Button 

var Rhodonea = function() {
    this.d = 8;
    this.n = 5;
    // this.sliderD;
    // this.sliderN;
    //Refactor additions for adding oscillations
    this.color;
    this.startAngle = 0;
    this.amplitude = 300;
    this.period = 100;
    this.angleVel = 0;
}

Rhodonea.prototype.update = function() {
  this.angleVel = (TWO_PI / this.period) * 5;
  this.startAngle += TWO_PI / this.period;
};

//This is directly adapted from the original draw function
Rhodonea.prototype.draw = function(){
  push();
  translate(width / 2, height / 2);
  this.color = color(random()*256,random()*256,random()*256);
    
  //beginShape();
  stroke(this.color);
  noFill();
  strokeWeight(1);
  /* Refactoring additions START */  
  var angle = this.startAngle;
//
       var y = sin(angle) * this.amplitude;
      // ellipse(x,y,10,10);
      angle += this.angleVel;
     // console.log( this.n / );
      //this.n = y;
      //this.d = y;
      var k = this.n / y;
      console.log(k);
      for (var a = 0; a < TWO_PI * this.reduceDenominator(); a += 0.02) {
          var r = 200 * cos(k * a);
          var nx = r * cos(a);
          var ny = r * sin(a);
          point(nx, ny);
      }
  //}
  /* Refactoring additions END */ 
  /* Original START */
    // this.d = this.sliderD.value();
    // this.n = this.sliderN.value();
    
    //color feature is added
  
    // for (var a = 0; a < TWO_PI * this.reduceDenominator(); a += 0.02) {
    //   var r = 200 * cos(k * a);
    //   //var x = r * cos(a);
    //   //var y = r * sin(a);
    //   point(x, y);
    // }
    
   // endShape(CLOSE);
    pop();
    //noLoop();
}

//this is directly adapted from the original setup for the sliders
Rhodonea.prototype.initialize = function(){
    // this.sliderD = createSlider(1,20,10,1);
    // this.sliderN = createSlider(1,20,10,1);
    // this.sliderD.input(draw);
    // this.sliderN.input(draw);
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
    //rose.initialize();
}

function draw() {
  background(0);
  rose.update();
  rose.draw();
}
