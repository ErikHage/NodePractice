//MAPS

//why not just use an object?
//  the prototypal nature of objects means that there could be mappings that you didn't intend
//  no easy way to know how many mappings there are
//  keys must be strings or symbols, preventing you from mappings objects to values
//  objects do not guarentee any order to their properties

//example mapping users to roles:

const u1 = { name: 'Cynthia' };
const u2 = { name: 'Jackson' };
const u3 = { name: 'Olive' };
const u4 = { name: 'James' };

const userRoles = new Map();

userRoles.set(u1, 'User');
userRoles.set(u2, 'User');
userRoles.set(u3, 'Admin');
//no role for James

//set is chainable
userRoles.set(u1, 'User')
	.set(u2, 'User')
	.set(u3, 'Admin');
	
//you can also pass an array of arrays to the constructor
const userRoles = new Map([
	[u1, 'User'],
	[u2, 'User'],
	[u3, 'Admin'],
]);

//use get method to recall values
userRoles.get(u1); // "User"

//returns undefined when no mapping
//has is like containsKey

userRoles.has(u1); // true
userRoles.get(u1); // "User"
userRoles.has(u4); // false
userRoles.get(u4); // undefined

//size property
userRoles.size; // 3

// keys() -> all keys
// values() -> all values
// entries() -> entries as arrays [key, value]
//use for...of loops

for(let u of userRoles.keys()) {
	//...
}

//delete method
userRoles.delete(u2);

//clear
userRoles.clear();


//WEAKMAPS

// identicle to Map except:
//		-keys must be objects
//		-keys in a WeakMap can be garbage collected
//		-WeakMap cannot be iterated or cleared

//can be used to store private keys in object instances

const SecretHolder = (function() {
	const secrets = new WeakMap();
	return class {
		setSecret(secret) {
			secrets.set(this, secret);
		}
		getSecret() {
			return secrets.get(this);
		}
	}
})();

//above we have a WeakMap inside an IIFE, along with the class that uses it.
//outside the IIFE we get a class that we call SecretHolder whose instances can store secrets
//can only set a secret through the setSecret method, and only get it through getSecret

const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

a.getSecret(); // "secret A"
b.getSecret(); // "secret B"

//if we used a regular Map then the secrets could never be garbage collected!


//SETS

//no duplicates

const roles = new Set();

roles.add('User'); // Set ["User"]
roles.add('Admin'); // Set ["User", "Admin"]

roles.size; // 2

roles.add('User'); // Set ["User"]
roles.size; // 2

roles.delete('Admin');  //true
roles; //Set ["User"]
roles.delete('Admin');  //false


//WEAKSETS

//can only contain objects
//can be garbage collected
//can't be iterated (therefort very rare)

//only use is determining whether or not a given object is in a Set or not

const naughty = new WeakSet();

const children = [
	{ name: "Suzy" },
	{ name: "Derek" },
];

naughty.add(children[1]);

for(let child of children) {
	if(naughty.has(child))
		console.log(`Coal for ${child}!`);
	else
		console.log(`Presents for ${child}!`);
}