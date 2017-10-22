//THE ERROR OBJECT

const err = new Error('Some message');

function validateEmail(email) {
	return email.match(/@/) ? 
		email :
		new Error(`invalid email: ${email}`);
}

//can use instanceof operator to determine if an instance of Error has been returned

const email = "jane@doe.com";

const validatedEmail = validateEmail(email);
if(validatedEmail instanceof Error) { 
	console.log(`Error: ${validatedEmail.message}`);
} else {
	console.log(`Valid email: ${validatedEmail}`);
}

//TRY AND CATCH

const email2 = null; // oops

try {
	const validatedEmail2 = validateEmail(email2);
	if(validatedEmail2 instanceof Error) { 
	console.log(`Error: ${validatedEmail2.message}`);
	} else {
		console.log(`Valid email: ${validatedEmail2}`);
	}
} catch(err) {
	console.log(`Error: ${err.message}`);
}


//THROWING ERRORS

//you can throw any type of object, but since you can't always control where they will be caught, only use Error

function billPay(amount, payee, account) {
	if(amount > account.balance)
		throw new Error("insufficient funds");
	account.transfer(payee, amount);
}


//EXCEPTION HANDLING CALL STACK

function a() {
	console.log('a: calling b');
	b();
	console.log('a: done');
}

function b() {
	console.log('b: calling c');
	c();
	console.log('b: done');
}

function c() {
	console.log('c: throwing error');
	throw new Error('c Error');
	console.log('c: done');
}

function d() {
	console.log('d: calling c');
	c();
	console.log('d: done');
}

try {
	a();
} catch(err) {
	console.log(err.stack);
}

try {
	d();
} catch(err) {
	console.log(err.stack);
}


//FINALLY

try {
	console.log("this line is executed...");
	throw Error("whoops");
	console.log("this line is not...");
} catch(err) {
	console.log("there was an error...");
} finally {
	console.log("...always executed");
	console.log("perform cleanup here");
}














