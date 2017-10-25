//CALLBACKS

//oldest async mechanism in JS
//very often, but not always, anonymous functions

console.log("Before timeout: " + new Date());
function f() {
	console.log("After timeout: " + new Date()); //actually happens last
}
setTimeout(f, 60*1000);
console.log("I happen after setTimeout");
console.log("Me too!");

//setInterval and clearInterval
// setInterval runs the callback at the specified interval forever, or until you call clearInterval

const start = new Date();
let i = 0;
const intervalId = setInterval(function() {
	let now = new Date();
	if(now.getMinutes() !== start.getMinutes() || ++i>10) 
		return clearInterval(intervalId);
	console.log(`${i}: ${now}`);
}, 5*1000);


//SCOPE AND ASYNC EXECUTION

//every time you invoke a function, you create a closure

function countdown() {
   console.log("Countdown:");
   for(let i=5; i>=0; i--) { //if we define let i; outside the loop, we get -1s returned for the countdown
      setTimeout(function() {
         console.log(i===0 ? "GO!" : i);
      }, (5-i)*1000);
   }
}
countdown();


//ERROR-FIRST CALLBACKS

// a convention to have the error as the first argument (started in Node)

const fs = require('fs');

const fname = 'may_or_may_not_exist.txt';
fs.readFile(fname, function(err, data) {
	if(err) return console.error(`error reading file ${fname}: ${err.message}`);
	console.log(`${fname} contents ${data}`);
});


//CALLBACK HELL

//practical drawback: difficult to manage when you need to wait on multiple things before proceeding

//ex: get contents of three different files, then wait 60 sec before combining the contents and writing to a fourth file

const fs = require('fs');

fs.readFile('a.txt', function(err, dataA) {
	if(err) console.error(err);
	fs.readFile('b.txt', function(err, dataB) {
		if(err) console.error(err);
		fs.readFile('c.txt', function(err, dataC) {
			if(err) console.error(err);
			setTimeout(function() {
				fs.writeFile('d.txt', dataA+dataB+dataC, function(err) {
					if(err) console.log(err);
				});
			}, 60*1000);
		});
	});
});

//and the above doesn't even do much error handling!

const fs = require('fs');
function readSketchyFile() {
	try {
		fs.readFile('does_not_exist.txt', function(err, data) {
			if(err) throw err;
		});
	} catch(err) {
		console.log('warning: minor issue occured, program continuing');
	}
}
readSketchyFile();

//but that won't work!
//promises can help