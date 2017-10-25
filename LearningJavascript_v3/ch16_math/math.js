//MATH

//formatting returns a string 

//toFixed(n) : number of digits past the decimal point
const x = 19.51;
x.toFixed(3); // "19.510"
x.toFixed(2); // "19.51"
x.toFixed(1); // "19.5"
x.toFixed(0); // "20"

//toExponential(n) 
const x2 = 3800.5;
x2.toExponential(4); // "3.8005e+3"
x2.toExponential(3); // "3.801e+3"
x2.toExponential(2); // "3.80e+3"
x2.toExponential(1); // "3.8e+3"
x2.toExponential(0); // "4e+3"

//toPrecision(n) - total number of digits
let x3 = 1000;
x3.toPrecision(5);    // "1000.0"
x3.toPrecision(4);    // "1000"
x3.toPrecision(3);    // "1.00e+3"
x3.toPrecision(2);    // "1.0e+3"
x3.toPrecision(1);    // "1e+3"
x3 = 15.335;
x3.toPrecision(6);    // "15.3350"
x3.toPrecision(5);    // "15.335"
x3.toPrecision(4);    // "15.34"
x3.toPrecision(3);    // "15.3"
x3.toPrecision(2);    // "15"
x3.toPrecision(1);    // "2e+1"

//different bases
const x4 = 12;
x4.toString();       // "12"  (base 10)
x4.toString(10);     // "12"  (base 10)
x4.toString(16);     // "c"   (hexadecimal)
x4.toString(8);      // "14"   (octal)
x4.toString(2);      // "1100" (binary)

//advanced formatting: Numeral.js library


//CONSTANTS

// fundamental constants
Math.E    // the root of the natural logarithm: ~2.718
Math.PI   // the ratio of a circle's circumference to its diameter: ~3.142

// logarithmic convenience constants -- these can be accessed through library
// calls, but they're commonly used enough to warrant convenience constants
Math.LN2       // the natural logarithm of 2: ~0.693
Math.LN10      // the natural logarithm of 10: ~2.303
Math.LOG2E     // the base 2 logarithm of Math.E: ~1.433
Math.LOG10E    // the base 10 logarithm of Math.E: 0.434

// algebraic convenience constants
Math.SQRT1_2   // the square root of 1/2: ~0.707
Math.SQRT2     // the square root of 2: ~1.414


//ALGEBRAIC FUNCTIONS

Math.pow(2,3);// 2^3
Math.sqrt(4); 
Math.cbrt(9); // cubed root
Math.exp(5);  // e^5
Math.expm(5); // e^5 - 1
Math.hypot(3,4); // square root of the sum of the squares  Math.hypot(x1,x2,...);

Math.log(5); // natural logarithm of argument
Math.log10(10); 
Math.log2(5); 
Math.log1p(5); // natural log of 1+x

Math.abs(4); //absolute value
Math.sign(4); //the sign, -1 if negative else 1 if positive, else 0 if 0
Math.ceil(4.5); //the smallest integer grater than or equal to x
Math.floor(4); //the largets integer less than or equal to x
Math.trunc(3.5); //the integral part of x, all fractional digits removed
Math.round(5.5); //round to nearest integer
Math.min(1,2,3,4); //returns smallest argument
Math.max(1,2,3,4); //returns largest argument

//(pseudo)random number generation

//Math.random : number in range of [0,1)  including 0 but not 1


//TRIGONOMETRIC FUNCTIONS

Math.sin(x); 
Math.cos(x);
Math.tan(x);
Math.asin(x); //arcsin
Math.acos(x);
Math.atan(x);
//Math.atan2(y, x0); // counterclockwise angle (in radians) from the x-axis to the point (x,y)


//HYPERBOLIC FUNCTIONS

Math.sinh(x);
Math.cosh(x);
Math.tanh(x);
Math.asinh(x);
Math.acosh(x);
Math.atanh(x);










