//ITERATORS

//new to ES6

const book = [
   "Twinkle, twinkle, little bat!",
   "How I wonder what you're at!",
   "Up above the world you fly,",
   "Like a tea tray in the sky.",
   "Twinkle, twinkle, little bat!",
   "How I wonder what you're at!",
];

//iterator via the values method
const it = book.values();

//next() returns the next value

it.next(); // { value: "Twinkle, twinkle, little bat!", done: false }

//properties
//  value (the content)
//  done (true even for last value, only false for undefined value)

//to enumerate for...of
//  works with anythign that provides an iterator

const it = book.values();
let current = it.next();
while(!current.done) {
	console.log(current.value);
	current = current.next();
}

//iterators are distinct, start at the beginning every time you create a new one


//THE ITERATION PROTOCOL

// any object can be iterable

//provide a symbol method Symbol.iterator that returns an object with iterator behavior
//	(next method that returns an object with value and done properties)

class Log {
	constructor() {
		this.mesages = [];
	}
	add(message) {
		this.messages.push({ message, timestamp: Date.now() });
	}
	[Symbol.iterator]() {
		return this.messages.values();
	}
}

const log = new Log();
log.add("First day at sea");
log.add("spotted whale");
log.add("spotted another vessel");
//...

for(let entry of log) {
	console.log(`${entry.message} @ ${entry.timestamp}`);
}

//could write yoru own iterator:

class Log2 {
	//...
	
	[Symbol.iterator]() {
		let i = 0;
		const messages = this.messages;
		return {
			next() {
				if(i >= messages.length) 
					return {value: undefined, done: true};
				return {value: messages[i++], done: false};
			}
		}
	}
}

//can also iterate forever, like the Fibonacci sequence


