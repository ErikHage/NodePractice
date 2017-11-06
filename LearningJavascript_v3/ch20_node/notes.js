//NODE.JS

//MODULES

//a mechanism for packaing namespace code
//namespacing is a way to prevent collisions

//in one file: amanda.js
function calculate(a, x, n) {
	if(x===1) return a*n;
	return a(1 - Math.pow(x, n))/(1 - x);
}
module.exports = calculate;

// in another file: tyler.js
function calculate(r) {
	return 4/3*Math.PI*Math.pow(r, 3);
}
module.exports = calculate;

//whatever you assin to export will be what is exported from the module
//in a third file: app.js

const amanda_calc = require('./amanda.js');
const tyler_cal = require('./tyler.js');

console.log(amanda_calc(1,2,5));  // 31
console.log(tyler_calc(2));       // 33.510...

//you can export multiple functions

module.exports = {
    geometricSum(a, x, n) {
        if(x === 1) return a*n;
        return a*(1 - Math.pow(x, n))/(1 - x);
    },
    arithmeticSum(n) {
        return (n + 1)*n/2;
    },
    quadraticFormula(a, b, c) {
        const D = Math.sqrt(b*b - 4*a*c);
        return [(-b + D)/(2*a), (-b - D)/(2*a)];
    },	
};

//the below is equivalent to the above

exports.geometricSum = function(a, x, n) {
    if(x === 1) return a*n;
    return a*(1 - Math.pow(x, n))/(1 - x);
};

exports.arithmeticSum = function(n) {
    return (n + 1)*n/2;
};

exports.quadraticFormula = function(a, b, c) {
    const D = Math.sqrt(b*b - 4*a*c);
    return [(-b + D)/(2*a), (-b - D)/(2*a)];
};


//CORE MODULES

//three types
// 1. Core  built in to node
// 2. File  a file in the project
// 3. NPM   not core and not a file, from npm

//some core modules always available, don't need to be required in


//CUSTOMIZING MODULES WITH FUNCTION MODULES

//common pattern - a module that exports a function that's intended to be invoked immediately
//  return avlue of that function is intended to be used
//  used when the module needs to be customized somehow

const debug = require('debug')('main');
debug('starting');

//how to implement this:

let lastMessage;

module.exports = function(prefix) {
	return function(message) {
		const now = Date.now();
		const sinceLastMessage = now - (lastMessage || now);
		console.log(`${prefix} ${message} +${sinceLastMessage}ms`);
		lastMessage = now;
	}
}

//what happens if you import a module multiple times? 

const debug1 = require('./debug')('one');
const debug2 = require('./debug')('two');

debug1('started first debugger!');
debug2('started second debugger!');

setTimeout(function() {
	debug1('after some time...');
	debug2('what happens?');
}, 200);

/*
one started first debugger! +0ms
two started second debugger! +0ms
one after some time... +200ms
two what happens? +0ms
*/

//as it turns out, Node only imports any given module once.


//FILESYSTEM ACCESS

const fs = require('fs');

//create a file: fs.writeFile
fs.writeFile('hello.txt', 'hello from Node!', function(err) {
    if(err) return console.log('Error writing to file.');
});

//node provides a variable '__dirname', which is always set to the directory in which the source file resides

fs.writeFile(__dirname + '/hello.txt',
        'hello from Node!', function(err) {
    if(err) return console.error('Error writing to file.');
});

//path makes the above more platform agnostic:

const path = require('path');

fs.writeFile(path.join(__dirname, 'hello.txt'),
        'hello from Node!', function(err) {
    if(err) return console.error('Error writing to file.');
});

//read a file with fs.readFile

fs.readFile(path.join(__dirname, 'hello.txt'), function(err, data) {
    if(err) return console.error('Error reading file.');
    console.log('Read file contents:');
    console.log(data);
});

//above returns a buffer if you don't provide an encoding, like below
fs.readFile(path.join(__dirname, 'hello.txt'),
        { encoding: 'utf8' }, function(err, data) {
    if(err) return console.error('Error reading file.');
    console.log('File contents:');
    console.log(data);
});

//have synchronous equivalents by adding 'Sync' to the method name

//read the files in a directory: fs.readdir

fs.readdir(__dirname, function(err, files) {
    if(err) return console.error('Unable to read directory contents');
    console.log(`Contents of ${__dirname}:`);
    console.log(files.map(f => '\t' + f).join('\n'));
});


//PROCESS

//node has a variable called 'process' that lets you get information about (and control) its own execution
//process.exit to stop 

const fs = require('fs');

fs.readdir('data', function(err, files) {
    if(err) {
        console.error("Fatal error: couldn't read data directory.");
        process.exit(1);
    }
    const txtFiles = files.filter(f => /\.txt$/i.test(f));
    if(txtFiles.length === 0) {
        console.log("No .txt files to process.");
        process.exit(0);
    }
    // process .txt files...
});

//process also contains an array of command line arguments passed to the program
$ node linecount.js file1.txt file2.txt file3.txt
console.log(process.argv);

/* 
[ 'node', 
  '/home/jdoe/linecount.js',
  'file1.txt',
  'file2.txt',
  'file3.txt' ]
*/

//process gives you access to environment variables through process.env
//example, for debugging purposes
const debug = process.env.DEBUG === "1" ? console.log : function() {};

debug("Visible only if environment variable DEBUG is set!");

//process.cwd - provides the current working directory
//process.chdir allows you to change the cwd
console.log(`Current directory: ${process.cwd()}`);
process.chdir(__dirname);
console.log(`New current directory: ${process.cwd()}`);


//OPERATING SYSTEM

//the os module provides some platform-specific information about the computer on which the app is running

const os = require('os');

console.log("Hostname: " + os.hostname());          // prometheus
console.log("OS type: " + os.type());               // Linux
console.log("OS platform: " + os.platform());       // linux
console.log("OS release: " + os.release());         // 3.13.0-52-generic
console.log("OS uptime: " + (os.uptime()/60/60/24).toFixed(1) + " days");   // 80.3 days
console.log("CPU architecture: " + os.arch());      // x64
console.log("Number of CPUs: " + os.cpus().length); // 1
console.log("Total memory: " + (os.totalmem()/1e6).toFixed(1) + " MB");        // 1042.3 MB
console.log("Free memory: " + (os.freemem()/1e6).toFixed(1) + " MB");         // 195.8 MB


//CHILD PROCESSES

//the child_process module allows your app to run other programs (node, exe, other language script, etc.)
//primary functions:
//  exec, execFile, fork (also three *Sync versions)

//exec invokes a shell
//execFile allows you to execute and executable directly
//fork allows you to execute other node scripts (can also be done with exec)
//  fork does invoke a separate node engine, and gives you access to some interprocess communication

//exec is the most general and most forgiving

//example execute the command dir (aka ls in Unix)
 
const exec = require('child_process').exec;

exec('dir', function(err, stdout, stderr) {
	if(err) return console.error('Error executing "dir"');
	stdout = stdout.toString(); //convert buffer to string
	console.log(stdout);
	stderr = stderr.toString();
	if(stderr !== '') {
		console.error('error:');
		console.error(stderr);
	}
});

//since exec spawns a shell, you don't need to give the path to 'dir' as long as it accessible in your system's shell
//exec also takes an optional 'options' object, which allows us to specify things like the working directory, env variables, and more.


//STREAMS

//an object that deals with data
//can read streams, write streams, or both (called duplex streams)
//flow of data over time
//  ex: typing on a keyboard, web service with back-and-forth communication with a client

//example; write stream
const ws = fs.createWriteStream('stream.txt', { encoding: 'utf8'});
ws.write('line 1\n');
ws.write('line 2\n');
ws.end();  //optionally takes a data argument like write

//example: read stream
const rs = fs.createReadStream('stream.txt', { encoding: 'utf8' });
rs.on('data', function(data) {
	console.log('>> data: ' + data.replace('\n', '\\n'));
});
rs.on('end', function(data) {
	console.log('>> end'));
});

//piping from one stream to another

const rs2 = fs.createReadStream('stream.txt');
const ws2 = fs.createWriteStream('stream_copy.txt');
rs2.pipe(ws2);
//no encoding necessary while piping


//WEB SERVERS

//orignal purpose of Node
//http / https modulees expose a createServer method that creates a basic web server
//all you do is provide a callback to handle incoming requests
//to start a server:
const http = require('http');

const server = http.createServer(function(req, res) {
	console.log(`${req.method} ${req.url}`);
	res.end('Hello world!');
});

const port = 8080;
server.listen(port, function() {
	//you can pass a callback to listen that lets you know the server has started
	console.log(`server started on port ${port}`);
});

//incoming message = request  = IncomingMessage type
//outgoing message = response = ServerResponse type

//adding a favicon:

const server = http.createServer(function(req, res) {
    if(req.method === 'GET' && req.url === '/favicon.ico') {
        const fs = require('fs');
        fs.createReadStream('favicon.ico');
        fs.pipe(res);       // this replaces the call to 'end'
    } else {
        console.log(`${req.method} ${req.url}`);
        res.end('Hello world!');
    }
});