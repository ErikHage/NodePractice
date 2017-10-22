//GENERATORS

//new to ES6

//functions that use an iterator to control their execution
//allow you control the execution of the function

//bring two things
//  1. ability to control the execution of a function, having it execute discrete steps
//  2. ability to communicate with the function as it executes

//like a regular function but with 2 exceptions
//  1. the function can yield control back to the caller at any point
//  2. when you call a generator, it doesn;t run right away. Instead, you get back an iterator.
//     the function runs as you call the iterator's next() method


function* rainbow() {
	yield 'red';
	yield 'orange';
	yield 'yellow';
	yield 'green';
	yield 'blue';
	yield 'indigo';
	yield 'violet';
}

const it = rainbow();
it.next(); // { value: "red", done: false }
//...
it.next(); // { value: "violet", done: false }
it.next(); // { value: undefined, done: true }

for(let color of rainbow()) {
	console.log(color);
}

//can have two way communication!

function* interrogate() {
	const name = yield "What is your name?";
	const color = yield "What is your favorite color?";
	return `${name}'s favorite color is ${color}.`;
}

const it = interrogate();
it.next(); // { value: "What is your name?", done: false }
it.next("Ethan"); // { value: "What is your favorite color?", done: false }
it.next("Red") // { value: "Ethan's favorite color is orange.", done: true }

//**You can't create a generator with arrow notation


//GENERATORS AND RETURN

//yield will not result in done, only return will return a 'done: true'

function* abc() {
	yield 'a';
	yield 'b';
	return 'c';
}

const it = count();
it.next();  // { value: 'a', done: false }
it.next();  // { value: 'b', done: false }
it.next();  // { value: 'c', done: true }

//** when using a for...of loop, the return statement will not be printed out (no 'c' in the above example)










