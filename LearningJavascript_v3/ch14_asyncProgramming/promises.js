//PROMISES

//when you call a promise-based async function, it returns Promise instance
//only 2 things can happen to that promise
// 1. fullfilled (success)
// 2. rejected (failure)
//you are guaranteed only one of those will happen and the result will only happen once

function countdown(seconds) {
	return new Promise(function(resolve, reject){
		for(let i=seconds; i>=0; i--) {
			setTimeout(function() {
				if(i==13) return reject(new Error("DEF NOT COUNTING THAT"));
				if(i>0) console.log(i + '...');
				else resolve(console.log("GO!"));
			}, (seconds-i)*1000);
		}
	});
}

//can just use it and ignore the promise:
//countdown(5);

//or use the promise
/*
countdown(13).then(
	function() {
		console.log("countdown completed successsfully");
	},
	function(err) {
		console.log("Countdown experienced an error: " + err.message);
	}
);
*/

//EVENTS

const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
	constructor(seconds, superstitious) {
		super();
		this.seconds = seconds;
		this.superstitious = !!superstitious;
	}
	go() {
		const cd = this;
		const timeoutIds = [];
		return new Promise(function(resolve, reject) {
			for(let i=cd.seconds; i>=0; i--) {
				timeoutIds.push(setTimeout(function() {
					if(cd.superstitious && i==13) {
						//clear all pending timeouts
						timeoutIds.forEach(clearTimeout);
						return reject(new Error("DEFINITELY NOT COUNTING THAT"));
					}
					cd.emit('tick', i);
					if(i===0) resolve();
				}, (cd.seconds-i)*1000));
			}
		});
	}	
}

//to use:

const c = new Countdown(15, true)
	.on('tick', function(i) {
		if(i>0) console.log(i + '...');
	});

c.go()
	.then(function() {
		console.log("GO!");
	})
	.catch(function(err) {
		console.error(err.message);
	});


//PROMISE CHAINING

function launch() {
	return new Promise(function(resolve, reject) {
		console.log("Lift off!");
		setTimeout(function() {
				resolve("In Orbit!");
		}, 2*1000);
	});
}

//chain to countdown

const c2 = new Countdown(5)
	.on('tick', i => console.log(i + '...'));
	
c2.go()
	.then(launch)
	.then(function(msg) {
		console.log(msg);
	})
	.catch(function(err) {
		console.error("Houston, we have a problem...");
	});


//PREVENTING UNSETTLED PROMISES

//not responsible failure
function launchWithFailure() {
	return new Promise(function(resolve, reject) {
		if(Math.random() < 0.5) return; //rocket failure
		console.log("Lift off!");
		setTimeout(function() {
				resolve("In Orbit!");
		}, 2*1000);
	});
}

//function that attaches a timeout to a promise [look this over again later!]
function addTimeout(fn, timeout) {
	if(timeout === undefined) timrout = 1000; //default timeout
	return function(...args) {
		return new Promise(function(resolve, reject) {
			const tid = setTiemout(reject, timeout, new Error("Promise timed out"));
			fn(...args)
				.then(function...args) {
					clearTimeout(tid);
					resolve(...args);
				})
				.catch(function(...args) {
					clearTimeout(tid);
					reject(...args);
				});
		});
	}
}

//if the slowest rocket should be 10 seconds, set a timeout of 11 seconds:

c.go()
	.then(addTimeout(launch, 11*1000))
	.then(function(msg) {
		console.log(msg);
	})
	.catch(function(err) {
		console.error("Houston, we have a probelm: " + err.message);
	});










