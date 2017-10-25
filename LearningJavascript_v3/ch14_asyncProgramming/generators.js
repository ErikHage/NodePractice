//GENERATORS

//read three files, combine them, and write to a fourth file:

//Node's error-first callbacks, encapsulated into a function call (in real life use the "Q" library)
function nfCall(f, ...args) {
	return new Promise(function(resolve, reject) {
		f.call(null, ...args, function(err, ...args) {
			if(err) return reject(err);
			resolve(args.length<2 ? args[0] : args);
		});
	});
}

//now we can convert any node-style method that takes a callback into a Promise

//promise timeout function:

function ptimeout(delay) {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, delay);
	});
}

//now we need a generator runner (grun)

function grun(g) {
	const it = g();
	(function iterate(val) {
		const x = it.next(val);
		if(!x.done) {
			if(x.value instanceof Promise) {
				x.value.then(iterate).catch(err => it.throw(err));
			} else {
				setTimeout(iterate, 0, x.value);
			}
		}
	})();
}

//now we can write easy to read code:

function* theFutureIsNow() {
	const dataA = yield nfCall(fs.readFile, 'a.txt');
	const dataB = yield nfCall(fs.readFile, 'b.txt');
	const dataC = yield nfCall(fs.readFile, 'c.txt');
	yield ptimeout(60*1000);
	yield nfCall(fs.writeFile, 'd.txt', dataA+dataB+dataC);
}

//and runnig it:
grun(theFutureIsNow);

//ok, but what about parallel? 

function* theFutureIsNow() {
	const data = yield Promise.all([
		nfCall(fs.readFile, 'a.txt'),
		nfCall(fs.readFile, 'b.txt'),
		nfCall(fs.readFile, 'c.txt'),
	]);
	yield ptimeout(60*1000);
	yield nfCall(fe.writeFile, 'd.txt', data[0]+data[1]+data[2]);
}

//**DON'T WRITE YOUR OWN GENERATOR RUNNER
// use "co genertor runner"
// use Koa for websites, works with co


//EXCEPTION HANDLING

//benefit - generators enable exception handling
//  like this:

function* theFutureIsNow() {
	let data;
	try {
		data = yield Promise.all([
			nfCall(fs.readFile, 'a.txt'),
			nfCall(fs.readFile, 'b.txt'),
			nfCall(fs.readFile, 'c.txt'),
		]);
	} catch(err) {
		console.error("Unable to read one or more input files: " + err.message);
		throw err;
	}
	yield ptimeout(60*1000);
	try {
		yield nfCall(fe.writeFile, 'd.txt', data[0]+data[1]+data[2]);
	} catch(err) {
		console.error("Unable to write output file: " + err.message);
		throw err;
	}
}
