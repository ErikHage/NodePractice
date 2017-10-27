//JAVASCRIPT IN THE BROWSER

//DOM

function printDOM(node, prefix) {
	console.log(prefix + node.nodeName);
	for(let i=0; i<node.childNodes.length; i++) {
		printDOM(node.childNodes[i], prefix + '\t');
	}
}	
printDOM(document, '');
//depth-first, pre-order traversal


//DOM get methods

const content = document.getElementById('content');
const callouts = document.getElementsByClassName('callout');
const paragraphs = document.getElementsByTagName('p');

//All of the DOM methods that return a collection do not return a JavaScript array, but an instance of HTMLCollection, which is an “array-like” object. You can iterate over it with a for loop, but the Array.prototype methods (such as map, filter, and reduce) won’t be available. You can convert an HTMLCollection to an array by using the spread operator: [...document.getElementsByTagName(p)].


//MANIPULATING DOM ELEMENTS

//two properties that allow you to access and change the element's content
//  textContent strips out any HTML and provides text data only
//  innerHTML allows you to create HTML (which results in new DOM nodes)


//CREATING NEW DOM ELEMENTS

//need to create then add in a separate step
const p1 = document.createElement('p');
const p2 = document.createElement('p');
p1.textContent('I was created dynamically!');
p2.textContent('I was also created dynamically!');

//insertBefore and appendChild methods

const parent = document.getElementById('content');
const firstChild = parent.childNodes[0];
parent.insertBefore(p1, firstChild);
parent.appendChild(p2);


//STYLING ELEMENTS

function highlightParas(containing) {
	if(typeof containing === 'string') {
		containing = new RegExp(`\\b${containing}\\b`, 'i');
	}
	const paras = document.getElementsByTagName('p');
	console.log(paras);
	for(let p of paras) {
		if(!containing.test(p.textContent)) 
			continue;
		p.classList.add('highlight');
	}
}
highlightParas('unique');

function removeParaHighlights() {
	const paras = document.querySelectorAll('p.highlight');
	for(let p of paras) {
		p.classList.remove('highlight');
	}
}


//DATA ATTRIBUTES

<button data-action="highlight" data-containing="unique">
	Highligh paragraphs containing "unique"
</button>
<button data-action="removeHighlights">
	Remove highlights
</button>

//we can use document.querySelectorAll to find all elements that have "highlight" as their action

const highlightActions = document.querySelectorAll('[data-action="highlight"]');
//square bracket syntax allows you to match elements by any attribute, in this case a specific data attribute

//they have a dataset property
highlightActions[0].dataset;
// DOMStringMap { containing: "unique", action: "highlight" }

//you can modify or add data attributes with JavaScript
highLightActions[0].dataset.containing = "giraffe";
highLightActions[0].dataset.caseSensitive = "true";


//EVENTS

//the DOM API describes almost 200 events, and each browser further implements nonstandard events

//click - hookup highlight button to our function

const highlightActions = document.querySelectorAll('[data-action="highlight"]');
for(let a of highlightActions) {
	a.addEventListener('click', evt => {
		evt.preventDefault();
		removeParaHighlights();
	});
}

const removeHighlightActions = document.querySelectorAll('[data-action="removeHighlights"]');
for(let a of removeHighlightActions) {
	a.addEventListener('click', evt => {
		evt.preventDefault();
		removeParaHighlights();
	});
}


//EVENT CAPTURING AND BUBBLING

//in what order do elements get the opportunity to respond to the event?
//two options:
//  1. Start at the most distant ancestor (Capturing)
//  2. Start at the element where the event occurred, then walk up the hierarchy so all ancestors have a chance to respond (Bubbling)

//to support both options, HTML5 event propagation starts by allowing handlers to capture the event (starting at the most distant ancestor and working down to the target element) and then the event bubbles back up from the target element to the most distant ancestor

//can prevent default - event still propagates, but defaultPrevented property is set to true
//can call stopPropagation, which prevents further propagation past the current element
//stopImmediatePropagation will prevent any further handlers from getting called (even in current element)


//EVENT CATEGORIES

//Drag events
//Focus events
//Form events
//Input device events
//Media events
//Progress events
//Touch events


//AJAX (Asynchronous JavaScript and XML)

//enables async communication with a server
//allows elements on your oage to be refreshed with data from the server without reloading the page

//requires a server - i.e. Node.js - that exposes an ajax endpoint

//ajax introduced the possibility of a security vulnerability called cross-origin resource sharing (CORS)
//  adding a header of Access-Control-Allow-Origin with a value of * to not prevent the call for security reasons. On a production server, you would use the same protocol, domain, and port (which would be allowed by default), or specify explicitly what protocol, domain, and port can access the endpoint. 

function refreshServerInfo() {
	const req = new XMLHttpRequest();
	req.addEventListener('load', function() {
		//todo: put these values into HTML
		console.log(this.responseText);
	});
	req.open('GET', 'http://localhost:7070', true);
	req.send();
}
refreshServerInfo();

//this will update the page from the server response
//we could set this up as an interval, and we can watch the status change (if it does)

setInterval(refreshServerInfo, 200);



























