//FUNCTIONS AS FUNCTIONS

//pure function - always return the same output for the same set of inputs
//              - no side effects


//WHY DO YOU NEED FUNCTIONS

// 1. to avoid repeating yourself
// 2. 

//benefits of pure functions
// 1. make code easier to test
// 2. easier to understand
// 3. more portable


//FUNCTIONS ARE OBJECTS


//IIFEs AND ASYNCHRONOUS CODE

setTimeout(function() { console.log("hello"); }, 1500);

var i;
for(i=5; i>=0; i--) {
	setTimeout(function() {
		console.log(i===0 ? "go!" : i);
	}, (5-i)*1000)
}
//because of var, this prints out -1 six times
 
//consider a named function 
function loopBody(i) {
	setTimeout(function() {
		console.log(i===0 ? "go!" : i);
	}, (5-i)*1000)
}
var i;
for(i=5; i>=0; i--) {
	loopBody(i);
}
//works but tedious to create named functions for any loop, especiall if you just use it once

//IIFE
var i;
for(i=5; i>=0; i--) {
	(function(i) {
		setTimeout(function() {
			console.log(i===0 ? "go!" : i);
		}, (5-i)*1000)
	})(i);
}
//creating a function that takes a single argument, and invokes it for each step in the loop
//block-scoped variables solve this problem for us without the extra hassel of requiring a function to create a new scope

//block-scoped variables make this much simpler (ES6)
for(let i=5; i>0; i--) {
	setTimeout(function() {
		console.log(i===0 ? "go!" : i);
	}, (5-i)*1000)	
}
//note: the let keyword must be inside the loop arguments


//FUNCTION VARIABLES

//aliasing a function
function addThreeSquareAddFiveTakeSquareRoot(x) {
   return Math.sqrt(Math.pow(x+3, 2)+5);
}
// before
const answer = (addThreeSquareAddFiveTakeSquareRoot(5) + addThreeSquareAddFiveTakeSquareRoot(2)) / addThreeSquareAddFiveTakeSqureRoot(7);
// after
const f = addThreeSquareAddFiveTakeSquareRoot;
const answer = (f(5) + f(2)) / f(7);

//common in Node development - namespacing

const Money = require('math-money');
const oneDollar = Money.Dollar(1); //we don't want to say Money.Dollar(1) everywhere
const Dollar = Money.Dollar;
const twoDollars = Dollar(2);

//functions in an array
//  useful for pipelines - add and remove steps as necessary
//  common in graphics transformations

const sin = Math.sin;
const cos = Math.cos;
const theta = Math.PI/4;
const zoom = 2;
const offset = [1,-3];

const pipeline = [
	function rotate(p) {
		return {
			x: p.x * cos(theta) - p.y * sin(theta),
			y: p.x * sin(theta) + p.y * cos(theta),
		};
	},
	function scale(p) {
		return { x: p.x * zoom, y: p.y * zoom };
	},
	function translate(p) {
		return { x: p.x + offset[0], y: p.y + offset[1] };
	},
];

//pipeline is now an array of functions for a specific 2D tranform
//can also trnsform a point:

const p = { x:1, y:1} ;
let p2 = p;
for(let i=0; i<pipeline.length; i++) {
	p2 = pipeline[i](p2);
}

//p2 is now p1 rotated 45 degrees (pi/4 radians) around the origin, moved 2 units farther from the origin,
//and translated 1 unit to the right and 3 units down

//Pass a function into a function

function sum(arr, f) {
	if(typeof f != 'function') 
		f = x => x;	
	return arr.reduce((a,x) => a += f(x), 0);
}
sum([1,2,3]);				// 6
sum([1,2,3], x => x*x);		// 14
sum([1,2,3], x => Math.pow(x,3)); //36

//Return a Function from a Function

function sumOfSquares(arr) {
	return sum(arr, x => x*x);
}

function newSummer(f) {
	return arr => sum(arr, f);
}

const sumOfSquares = newSummer(x => x*x);
const sumOfCubes = newSummer(x => Math.pow(x, 3));
sumOfSquares([1,2,3]); // 14
sumOfCubes([1,2,3]);   // 36


//RECURSION

function findNeedle(haystack) {
	if(haystack.length === 0) 
		return 'no haystack here!';
	if(haystack.shift() === 'needle')
		return 'found it!';
	return findNeedle(haystack);	
}

findNeedle(['hay','hay','hay','hay','hay','hay','needle','hay','hay']);

function factorial(n) {
	if(n === 1) return 1;
	return n * factorial(n-1);
}












