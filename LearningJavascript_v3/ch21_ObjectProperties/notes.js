//ACCESSOR PROPERTIES: GETTERS AND SETTERS

//two types of object properties: data properties and accessor properties
//  accessor hidden behind some ES6 syntactic sugar (AKA dynamic properties)

//accessor properties have two functions, a getter and a setter, and when accesses they act more like a data property than a function

//you have a User class, with methods setEmail and getEmail

const USER_EMAIL = Symbol();
class User {
	setEmail(value) {
		if(!/@/.test(value)) throw new Error(`invalid email: ${value}`);
		this[USER_EMAIL] = value;
	}
	getEmail() {
		return this[USER_EMAIL];
	}
}

//using a symbol property to discourage direct access of the property
//this is a common pattern, and works well, but slightly more unwieldy than we might like
//example of using that class:

const u = new User();
u.setEmail('john@doe.com');
console.log(`user email: ${u.getEmail()}`);

//a more natural way to write that is:

const u2 = new User();
u2.email = 'john@doe.com';
console.log(`user email: ${u.email}`);

//we can do this with accessor properties:

const USER_EMAIL = Symbol();
class User {
	set email(value) {
		if(!/@/.test(value)) throw new Error(`invalid email: ${value}`);
		this[USER_EMAIL] = value;
	}
	get email() {
		return this[USER_EMAIL];
	}
}
//two distinct functions, but they are bundled into a single property
//you can provide a getter without a setter (getter only for readonly parameters)
//and vice versa, but that is much less common


//OBJECT PROPERTY ATTRIBUTES

//properties have attributes
const obj = { foo: "bar" };
Object.getOwnPropertyDescriptor(obj, 'foo'); 

/*
	will return:	
	{ 
	  value: "bar", 
	  writable: true, 
	  enumerable: true, 
	  configurable: true 
	}
*/

// Writable - controls whether the value of the property can be changed
// Enumerable - controls whether the property will be included when the properties of the object are enumerated (with for...in, Object.keys, or the spread operator)
// Configurable - controls whether the property can be deleted from the object or have its attributes modified

//we can control property attributes with Object.defineProperty, which allows you to create new properties or modify existing ones (as long as the property is configurable)

Object.defineProperty(obj, 'foo', { writable: false });

//now if we try to assign a value to foo we get an error

obj.foo = 3; // TypeError: Cannot assign to read only property 'foo' of [object Object]
//** in strict mode -> Error , otherwise the assignment will not be successful but there will be no error

//define new properties
//accessor
Object.defineProperty(obj, 'color', {
	get: function() { return this.color; },
	set: function(value) { this.color = value; }
});

//data
Object.defineProperty(obj, 'name', { value: 'Cynthia' });
Object.defineProperty(obj, 'greet', { 
	value: function() { return `Hello, my name is ${this.name}!`; }
});

//one common use of Object.defineProperty is to make properties not enumerable
//if you add non-numeric properties to an array, you should make them non-enumerable
//example: adding sum and avg methods to an array

const arr = [3, 1.5, 9, 2, 5.2];
arr.sum = function() { return this.reduce((a,x) => a+x); }
arr.avg = function() { return this.sum()/this.length; }
Object.defineProperty(arr, 'sum', { enumerable: false });
Object.defineProperty(arr, 'avg', { enumerable: false });

//could do this in one step per property

Object.defineProperty(arr, 'sum', {
    value: function() { return this.reduce((a, x) => a+x); },
    enumerable: false
 });
Object.defineProperty(arr, 'avg', {
    value: function() { return this.sum()/this.length; },
    enumerable: false
});

//also Object.defineProperties to do many at once:

Object.defineProperties(arr,
    sum: {
        value: function() { return this.reduce((a, x) => a+x); },
        enumerable: false
     }),
    avg: {
        value: function() { return this.sum()/this.length; },
        enumerable: false
    })
);


//PROTECTING OBJECTS

//JS is very flexible, easy to be unintentionally dangerous or intentionally malicious

//three mechanisms for preventing unintentional modifications (and making intentional ones more difficult)
//  Freezing
//  Sealing
//  Preventing Extensions

//Freezing 
//  Prevents any changes to an object. once you freeze an object you cannot:
//  - set the value of properties on the object
//  - call methods that modify the value of properties on the object
//  - invoke setters on the object (that modify the value of properties on the object)
//  - add new properties
//  - add new methods
//  - change the configuration of existing properties or methods

//in essence, freezing an object makes it immutable
//most useful for data-only objects, as freezing an object with methods will render useless any methods that modify the state of the object

const appInfo = {
	company: "White Knight Software, Inc.",
	version: "1.3.5",
	buildId: '0a995448-ead4-4a8b-b050-9c9083279ea2',
    // this function only accesses properties, so it won't be affected by freezing
    copyright() {
        return `© ${new Date().getFullYear()}, ${this.company}`;
    },
};
Object.isFrozen(appinfo); // false
Object.freeze(appInfo);
Object.isFrozen(appinfo); // true

appInfo.newProp = 'test'; // TypeError: Can't add property newProp, object is not extensible
delete appInfo.company; // TypeError: Cannot delete property 'company' of [object Object]
appInfo.company = 'test'; // TypeError: Cannot assign to read-only property 'company' of [object Object]
Object.defineProperty(appInfo, 'company', { enumerable: false }); // TypeError: Cannot redefine property: company

//Sealing an object 
//  Prevents the addition of new properties, or the reconfiguration or removal of existing properties

class Logger {
    constructor(name) {
        this.name = name;
        this.log = [];
    }
    add(entry) {
        this.log.push({
            log: entry,
            timestamp: Date.now(),
        });
    }
}

const log = new Logger("Captain's Log");
Object.isSealed(log);   // false
Object.seal(log);
Object.isSealed(log);   // true

log.name = "Captain's Boring Log";          // OK
log.add("Another boring day at sea....");   // OK

log.newProp = 'test'; // TypeError: Can't add property newProp, object is not extensible
log.name = 'test';      // OK
delete log.name; // TypeError: Cannot delete property 'name' of [object Object]
Object.defineProperty(log, 'log', { enumerable: false }); // TypeError: Cannot redefine property: log

//Making an object nonextensible (the weakest protection)
//  only prevents new properties from being added
//  properties can be assigned to, deleted, and reconfigured

const log2 = new Logger("First Mate's Log");
Object.isExtensible(log2);   // false
Object.preventExtensions(log2);
Object.isExtensible(log2);   // true

log2.name = "First Mate's Boring Log";       // OK
log2.add("Another boring day at sea....");   // OK

log2.newProp = 'test';
// TypeError: Can't add property newProp, object is not extensible

log2.name = 'test';                 // OK
delete log2.name;                   // OK
Object.defineProperty(log2, 'log',
    { enumerable: false });         // OK


//PROXIES

//new to ES6
//provide additional metaprogramming functionality (ability for program to modify itself)

//an object proxy has the ability to intercept and (optionally) modify actions on an object
//example: modifying property access

const coefficients = {
	a: 1,
	b: 2,
	c: 5
};

//might be used like this:
function evaluate(x, c) {
	return c.a + c.b * x + c.c * Math.pow(x, 2);
}

//what of we pass an object with missing coefficients?
//use proxies:

const betterCoefficients = new Proxy(coefficients, {
	get(target, key) {
		return target[key] || 0;
	},
});

//first argument to the proxy constructor is the target, or the object being proxied
//second is the handler, which specifies the actions to be intercepted


//in this case, only intercepting property access, denoted by the get function
//  --this is distinct from the get property accessor, this will work for regular and properties and get accessors
//the get function takes three arguments (we're only using the first two)
//  the target, the property key (string or a symbol), and the receiver (the proxy itself, or something that derives from it)

//example: check to see if the key is set on the target, if it's not, we return 0

betterCoefficients.a;           // 1
betterCoefficients.b;           // 0
betterCoefficients.c;           // 3
betterCoefficients.d;           // 0
betterCoefficients.anything;    // 0;

//the above covers all properties
//we can change it to only proxy single lowercase letters

const betterCoefficients = new Proxy(coefficients, {
    get(target, key) {
        if(!/^[a-z]$/.test(key)) return target[key];
        return target[key] || 0;
    },
});

//similarly, we can intercept properties (or accessors) being set with the set handler
//example: dangerous properties on an object, we want to prevent them from being set and methods from being called, without an extra step. The extra step is a setter called allowDangerousOperations, which you have to set to true before accessing dangerous functionality

const cook = {
	name: "Walt",
	redPhosphorus: 100,
	water: 500,
};
const protectedCook = new Proxy(cook, {
	set(target, key, value) {
		if(key === 'redPhosphorus') {
			if(target.allowDangerousOperations)
				return target.redPhosphorus = value;
			else
				return console.log("Too dangerous!");
		}
		//all other properties are safe
		target[key] = value;
	}
});

protectedCook.water = 550;			// 550
protectedCook.redPhosphorus = 150;	// Too dangerous!

protectedCook.allowDangerousOperations = true;
protectedCook.redPhosphorus = 150;  // 150