const Joi = require('./node_modules/joi/lib/index');

const employee = Joi.object().keys({
	firstname: Joi.string().alphanum().min(2).max(30).required(),
	lastname: Joi.string().alphanum().min(2).max(30).required(),
	password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
	access_token: [Joi.string(), Joi.number()],
	wage: Joi.number().min(0).required(),
	email: Joi.string().email(),
	phone: Joi.string()
}).with('firstname', 'lastname').without('password', 'access_token');

const emp1 = {
	firstname: "Erik",
	lastname: "Hage",
	password: "AS123der",
	wage: 15.25,
	email: "ehage4@gmail.com",
	phone: "609-290-6433"
};

const emp2 = {
	firstname: "Erik",
	wage: 15.25,
	email: "ehage4@gmail.com",
	phone: "609-290-6433"
};

const emp3 = {
	firstname: "Erik",
	lastname: "Hage",
	password: "AS123der",
	access_token: "abc",
	wage: 15.25,
	email: "ehage4@gmail.com",
	phone: "609-290-6433"
};

const result1 = Joi.validate(emp1, employee);
const result2 = Joi.validate(emp2, employee);
const result3 = Joi.validate(emp3, employee);

console.log("result1: " + result1.error);
console.log("result2: " + result2.error);
console.log("result3: " + result3.error);

const callback = (err, value) => {
	if(err) { 
		console.log("There was an error! ");
		console.log(err);
	} else {
		console.log("Success! ");
		console.log(value);
	}
};

Joi.validate(emp1, employee, callback);
Joi.validate(emp2, employee, callback);
Joi.validate(emp3, employee, callback);