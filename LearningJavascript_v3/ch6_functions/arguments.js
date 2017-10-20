//default arguments

function f(a, b = "default", c = 3) {
	return `${a} - ${b} - ${c}`;
}

f(5,6,7); //5 - 6 - 7
f(5,6);   //5 - 6 - 3
f(5);     //5 - default - 3
f();      //undefined - default - 3


//methods in objects

const o = {
	name: "Zoey",
	bark() { return "Woof!"; }, //a function property (method)
}


//function .call(obj)
//	provides a obj to bind to 'this'

const bruce = { name: "Bruce" };
const madeline = { name: "Madeline" };

//this function isn't associated with any object, yet it's using "this"
function greet() {
	return `Hello, I'm ${this.name}!`;
}

greet(); //Hello, I'm ! - 'this' is not bound
greet(bruce); //Hello, I'm Bruce! - 'this' bound to 'bruce'
greet(madeline); //Hello, I'm Madeline! - 'this' bound to 'madeline'

//additional arguments

function update(birthYear, occupation) {
	this.birthYear = birthYear;
	this.occupation = occupation;
}

update.call(bruce, 1949, 'singer');
//bruce is now { name: 'Bruce', birthYear: 1949, occupation: 'singer' }

//apply is identicle to call except it handles the arguments differently
update.apply(bruce, [1955, 'actor']);


//if a function doesn't use this, you can pass arguments to methods:

const arr = [2,3,-5,15,7];
Math.min.apply(null, arr); // -5
Math.max.apply(null, arr); // 15

//ES6 spread operator
const newBruce = [1940, "martial artist"];
update.call(bruce, ...newBruce);
Math.min(...arr);
Math.max(...arr);


//.bind() permanently binds an object to this
const updateBruce = update.bind(bruce);

updateBruce(1904, "actor");
//	bruce is now { name: "Bruce", birthYear: 1904, occupation: "actor" }
updateBruce.call(madeline, 1274, "king");
//	bruce is now { name: "Bruce", birthYear: 1274, occupation: "king" }
//	madeline is unchanged

//can also bind arguments
const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949("singer, songwriter");
//	bruce is now { name: "Bruce", birthYear: 1949, occupation: "singer, songwriter" }

