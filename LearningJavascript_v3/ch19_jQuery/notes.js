//jQuery

//library for manipulating the DOM and executing Ajax requests

//the dollar sign is used as an identifier (shortened version of the variable named jQuery)

//CDN
//<script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
//jQuery 2.x dropped support for IE 6-8, need to user 1.x for those browsers

//Waiting for the DOM to load
//  jQuery allows you to put your code in a callback that will be executed when the DOM has been constructed

$(document).ready(function() {
	//code here is run after all HTML has been loaded and the DOM is constructed
});

//shorter version
$(function() {
	//code
});

//it is safe to have multiple of these callbacks in different locations


//JQUERY-WRAPPED DOM ELEMENTS

//primary technique

//jQuery function $ creates a jQuery-wrapped set of DOM elements (aka jQuery object)
//called in one of two ways
// 1. CSS selector
const $paras = $('p');
$paras.length;            // number of paragraph tags matched
typeof $paras;            // 'object'
$paras instanceof $;	  // true
$paras instanceof jQuery; // true

// 2. with HTML
const $newPara = $('<p>Newly created paragraph...</p>');
//creates new DOM elements


//MANIPULATING ELEMENTS

//jQuery methods equivalent to DOM element methods
// text == textContent
// html == innerHTML

$('p').text('ALL PARAGRAPHS REPLACED WITH THIS TEXT');

$('p').html('<i>ALL</i> PARAGRAPHS REPLACED WITH THIS TEXT');

//when selecting groups of elements, use eq to select one of them

$('p').eq(2) //selects third paragraph

//remove elements
$('p').remove();

//adding new content
//append() appends the provided content to every element in the jQuery object
$('p').append('<sup>*</sup>'); //adds footnote to all paragraphs

//adding before or after
$('p').after('<hr>').before('<hr>'); //adds a horizontal divider before and after

//other methods (creating new elements then appending)
$('<sup>*</sup>').appendTo('p');  // equivalent to $('p').append('<sup>*</sup>')
$('<hr>').insertBefore('p');      // equivalent to $('p').before('<hr>')
$('<hr>').insertAfter('p');       // equivalent to $('p').after('<hr>');

//modify the styling with addClass and removeClass
//toggle with toggleClass
//manipulate style directly with .css method 
$('p:odd').css('color','red');

//selecting a subset of elements in a jQuery object
// filter, not, find

//filter to make every other paragraph red after we've modified each paragraph
$('p')
	.after('<hr>')
	.append('<sup>*</sup>')
	.filter(':odd')
	.css('color','red');
	
//not is the inverse of filter
//add an <hr> after every paragraph, and then indent any paragraph that doesn't have the class highlight
$('p')
	.after('<hr>')
	.not('.highlight')
	.css('margin-left','20px');
	
//find returns the set of descendant elements that matches the given criteria (as opposed to filter, which filters the existing set)
//add an <hr> before every paragraph and then increase the font size of elements with the class 'code'
$('p')
	.before('<hr>')
	.find('.code')
	.css('font-size','30px');


//UNWRAPPING JQUERY OBJECTS

//the get method
const para2 = $('p').get(1);

//to get an array of all paragraph DOM elements
const paras = $('p').get();


//AJAX

//ajax method that allows sophisticated control
//convience methods to make it easier
//methods support callbacks and can also return promises

function refreshServerInfo() {
	const $serverInfo = $('.serverinfo');
	$.get('http://localhost:7070').then(
		//successful return
		function(data) {
			Object.keys(data).forEach(p => {
				$(`[data-replace="${p}"]`).text(data[p]);
			});
		},
		//error
		function(jqXHR, textStatus, err) {
			console.log(err);
			$serverInfo.addClass('error')
				.html('Error connecting to server');
		}
	);
}


















