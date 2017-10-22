class Car {
	constructor(make, model) {
		this.make = make;
		this.model = model;
		this.userGears = ['P','N','R','D'];
		this.userGear = this.userGears[0];
	}
	shift(gear) {
		if(this.userGears.indexOf(gear) < 0) {
			throw new Error(`Invalid gear: ${gear}`);
		}
		this.userGear = gear;
	}
}

const car1 = new Car("Jeep","Liberty");
const car2 = new Car("Toyota","Corolla");

car1 instanceOf Car //true
car2 instanceOf Array //false

car1.shift('D');
car2.shift('R');

car1.userGear; // "D"
car2.userGear; // "R"

//access modifiers
//javascript doesn't have them

//poor man's access restriction - private marked with underscore
class Car {
	constructor(make, model) {
		this.make = make;
		this.model = model;
		this._userGears = ['P','N','R','D'];
		this._userGear = this.userGears[0];
	}
	
	get userGear() {
		return this._userGear;
	}
	
	set userGear(value) {
		if(this._userGears.indexOf(value) < 0) {
			throw new Error(`Invalid gear: ${value}`);
		}
		this._userGear = value;
	}
	
	shift(gear) {
		this.userGear = gear;
	}
}

//enforce privacy with WeakMap
//closure to prevent access to map
const Car = (function() {
	
	const carProps = new WeakMap();

	class Car {
		constructor(make, model) {
			this.make = make;
			this.model = model;
			this._userGears = ['P','N','R','D'];
			carProps.set(this, { userGear: this._userGears[0] });
		}		
		get userGear() {
			return this._userGear;
		}		
		set userGear(value) {
			if(this._userGears.indexOf(value) < 0) {
				throw new Error(`Invalid gear: ${value}`);
			}
			this._userGear = value;
		}		
		shift(gear) {
			this.userGear = gear;
		}
	}
	
	return Car;
})();


//CLASSES ARE FUNCTIONS
//Car in ES5:
function Car(make, model) {
	this.make = make;
	this.model = model;
	this._userGears = ['P','N','R','D'];
	this._userGear = this.userGears[0];
}

//typeOf both will return 'function'


//PROTOTYPE
//  every function has a special property called prototype f.prototype
//  when you create an object with the new keyword, the instance has access to its constructor's prototype object
//  all instances of the same class share the same prototype
// dynamic dispatch
//		when you attempt to access a property or method on an object, if it doesn't exist, JS checks the object's prototype to see if it exists there

//defining a method or property on an instance will override the version in the prototype (JS checks the instance first)

const car1 = new Car();
const car2 = new Car();
car1.shift === Car.prototype.shift; //true
car1.shift('D');
car1.shift('d'); //error
car1.userGear; //"D"
car1.shift === car2.shift; //true

car1.shift = function(gear) { this.userGear = gear.toUpperCase(); } 
car1.shift === Car.prototype.shift; //false;
car1.shift === car2.shift; //false
car1.shift('d');
car.userGear; // "D"


//STATIC METHODS
class Car {
   static getNextVin() {
      return Car.nextVin++;    
	  // we could also use this.nextVin++ but referring to Car emphasizes that this is a static method
   }
   constructor(make, model) {
      this.make = make;
      this.model = model;
      this.vin = Car.getNextVin();
   }
   static areSimilar(car1, car2) {
      return car1.make===car2.make && car1.model===car2.model;
   }
   static areSame(car1, car2) {
      return car1.vin===car2.vin;
   }
}
Car.nextVin = 0;

const car1 = new Car("Tesla", "S");
const car2 = new Car("Mazda", "3");
const car3 = new Car("Mazda", "3");

car1.vin; //0
car2.vin; //1
car3.vin; //2

Car.areSimilar(car1, car2); //false
Car.areSimilar(car2, car3); //true
Car.areSame(car2, car3); //false
Car.areSame(car2, car2); //true


//INHERITANCE

class Vehicle {
	constructor() {
		this.passengers = [];
		console.log("Vehicle created");
	}
	addPassenger(p) {
		this.passengers.push(p);
	}
}

class Car extends Vehicle {
	constructor() {
		super(); //required by subclasses
		console.log("Car created");
	}
	deployeAirbags() {
		console.log("BWOOSH!");
	}
}

const v = new Vehicle();
v.addPassenger("Frank");
v.addPassenger("Judy");
v.passengers;  // ["Frank", "Judy"]
const c = new Car();
c.addPassenger("Alice");
c.addPassenger("Cameron");
c.passengers;  // ["Alice", "Cameron"]

v.deployAirbags();  //error
c.deployAirbags() // "BWOOSH!"


//POLYMORPHISM

class Motorcycle extends Vehicle {} 
const c = new Car();
const m = new Motorcycle();

c instanceOf Car; //true
c instanceOf Vehicle; //true
m instanceOf Car; //false
m instanceOf Motorcycle; //true
m instanceOf Vehicle; //true


//ENUMERATING OBJECT PROPERTIES

//obj.hasOwnProperty(x)
//	returns true  if: obj has property x
//	returns false if: property isn't defined or is defined in the prototype chain

class Super {
	constructor() {
		this.name = "Super";
		this.isSuper = true;
	}
}

//this is valid, but not a good idea...
Super.prototype.sneaky = 'not recommended!';

class Sub extends Super {
	constructor() {
		super();
		this.name = "Sub";
		this.isSub = true;
	}
}

const obj = new Sub();

for(let p in obj) {
	console.log(`${p}: ${obj[p]} ` + (obj.hasOwnProperty(p) ? '' : '(inherited)'));
}

//output:
// name: sub
// isSuper: true
// isSub: true
// sneaky: not recommended! (inherited)

//name, isSuper, isSub are all defined in the instance, not the prototype chain
//avoid this issue by using Object.keys method


//STRING REPRESENTATION
//default: [object Object]

//for Car:
class Car {
	toString() {
		return `${this.make} ${this.model}: ${this.vin}`;
	}
}


//MULTIPLE INHERITANCE, MIXINS, INTERFACES

//no multiple inheritance by extending
//use mixins

class InsurancePolicy() {}
function makeInsurable(o) {
	o.addInsurancePolicy = function(p) { this.insurancePolicy = p; }
	o.getInsurancePolicy = function() { return this.insurancePolicy }
	o.isInsured = function() { return !!this.insurancePolicy }
}

//above can make any object insurable

makeInsurable(Car.prototype);
const car1 = new Car();
car1.addInsurancePolicy(new InsurancePolicy());

//can still have issues
//  adding a shift method to the mixin would break Car
//  can't use instanceOf to identify objects that are insurable (must use duck typing)
//can be helped by Symbols

class InsurancePolicy() {}
const ADD_POLICY = Symbol();
const GET_POLICY = Symbol();
const IS_INSURED = Symbol();
const _POLICY = Symbol();
function makeInsurable(o) {
	o[ADD_POLICY] = function(p) { this[_POLICY] = p; }
	o[GET_POLICY] = function() { return this[_POLICY]; }
	o[IS_INSURED] = function() { return !!this[_POLICY]; }
}

//bc symbols are unique, this ensures the mixin will never interfere with existing Car functionality
