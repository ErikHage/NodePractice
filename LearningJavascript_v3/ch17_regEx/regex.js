//SUBSTRING MATCHING AND REPLACING

let input = "As I was going to Saint Ives";
input.startsWith("As"); //true
input.endsWith("Ives"); //true
input.startsWith("going", 9); //true - start at index 9
input.endsWith("going", 14); //true - treat index 14 as the end of the string
input.includes("going"); //true
input.includes("going", 10); //false --starting at index 10
input.indexOf("going"); //9
input.indexOf("going", 10); //-1
input.indexOf("nope"); //-1

//above are all case-sensitive
input.toLowerCase().startsWith("as"); //true

const output = input.replace("going", "walking");
console.log(input);
console.log(output);


//CONSTRUCTING REGULAR EXPRESSIONS

//represented by the class RegExp
//have their own literal syntax

const re1 = /going/;
const re2 = new RegExp("going");


//SEARCHING WITH REGULAR EXPRESSIONS

const re3 = /\w{3,}/ig; //all words three letter or longer

//string methods
input.match(re3);      // ["was", "going", "Saint", "Ives"]
input.search(re3);     // 5 (the first three-letter word starts at index 5)

//regex methods
re3.test(input);       // true (input contains at least one three-letter word)
re3.exec(input);       // ["was"] (first match)
re3.exec(input);       // ["going"] (exec "remembers" where it is)
re3.exec(input);       // ["Saint"]
re3.exec(input);       // ["Ives"]
re3.exec(input);       // null -- no more matches

// note that any of these methods can be used directly with a regex literal
input.match(/\w{3,}/ig);
input.search(/\w{3,}/ig);
/\w{3,}/ig.test(input);
/\w{3,}/ig.exec(input);


//REPLACING WITH REGULAR EXPRESSIONS

const output2 = input.replace(/\w{4,}/ig, "****"); 

console.log(input);
console.log(output2);


//INPUT CONSUMPTION

//Strings are consumed from left to right.
//Once a character has been consumed, it is never revisited.
//If there is no match, the regex advances one character at a time attempting to find a match.
//If there is a match, the regex consumes all the characters in the match at once; matching continues with the next character (if the regex is global).


//ALTERNATION

let html = 'HTML with <a href="/one">one link</a>, and some Javascript. <script src="stuff.js"></script>';
let matches = html.match(/area|a|link|script|source/ig); //first attempt

// | - metacharacter that signals alternation
// i - ignore case
// g - search globally (otherwise only first match is returned)

// area comes before a, becuase otherwise it would find a and then be left with rea that would never match area


//MATCHING HTML

//regex not meant for searching html, but it can be done
//html can be constructed to defeat regex

html = "<br> [!CDATA[[<br>]]]";
matches = html.match(/<br>/ig);  //this will match twice, even though htere is only one true <br> tag


//CHARACTER SETS

let beer99 = "99 bottles of beer on the wall take 1 down and pass it around -- 98 bottles of beer on the wall.";
matches = beer99.match(/0|1|2|3|4|5|6|7|8|9/g); //tedious and annoying

let m1 = beer99.match(/[0123456789]/g); //okay
let m2 = beer99.match(/[0-9]/g);  //better

let match = beer99.match(/[\-0-9a-z.]/ig); //will match everything but whitespace

//negate character sets
match = beer99.match(/[^\-0-9a-z.]/); //will only match whitespace


//NAMED CHARACTER SETS

/*
\d  [0-9]
\D  [^0-9]
\s  [ \t\v\n\r]
\S  [^ \t\v\n\r]
\w  [a-zA-Z_]   note dashes and periods are not included
\W  [^a-zA-Z_]
*/

//most commonly used is \s

let stuff =
   'hight:      9\n' +
   'medium:     5\n' +
   'low:        2\n';
let levels = stuff.match(/:\s*[0-9]/g);  //* means 0 or more

//easy to normalize phone numbers

let messyPhone = '(505) 555-1515';
let neatPhone = messyPhone.replace(/\D/g ,'');

//check if a field has some value besides whitespace

let field = '  something   ';
let valid = /\S/.test(field);


//REPETITION

match = beer99.match(/[0-9]+/);

// + preceeding element should match one or more times

//{n}    exactly n    			/d{5}/ matches only 5 digit numbers
//{n,}   at least n   			/d{5,}/ matches only 5 digit numbers or longer
//{n,m}  at least n, most m    	/d{2,5}/ matches only numbers between 2 and 5 digits
//?      zero or one 			/[a-z]\d?/i matches letter followed by an optional digit
//*      zero or more			/[a-z]\d*/i matches a ltter followed by an optional number, possibly of multiple digits
//+      one or more			/[a-z]\d+/i matches a letter followed by a required number, possible of multiple digits


//THE PERIOD METACHARACTER AND ESCAPING

//period mean match anything (expect newlines)
input = "Address: 333 Main St., Anywhere, NY, 55532.  Phone: 555-555-2525.";
match = input.match(/\d{5}.*/); //single five digit zip code, and ignore the rest of the line

//escaping

let equation = "(2 + 3.5) * 7";
match = equation.match(/\(\d \+ \d\) \* \d/);


//GROUPING

//subexpressions treated as a single unit

//noncapturing groups - performance advantages
// (?: <subexpression>) 

let text = "Visit oreilly.com today!";
match = text.match(/[a-z]+(?:\.com|\.org|\.edu)/i);

//can apply repetition to groups

html = '<link rel="stylesheet" href="http://insecure.com/stuff.css">\n' +
   '<link rel="stylesheet" href="https://secure.com/securestuff.css">\n' +
   '<link rel="stylesheet" href="//anything.com/flexible.css">';

matches = html.match(/(?:https?)?\/\/[a-z][a-z0-9-]+[a-z0-9]+/ig);


//LAZY MATCHES, GREEDY MATCHES

//greedy by default - they will match as much as possible before stopping

//example
//replace <i> text with <strong> text

input = "Regex pros know the difference between\n<i>greedy</i> and <i>lazy</i> matching.";
input.replace(/<i>(.*)<\/i>/ig, '<strong>$1</strong>');

//above will give you: 
// "Regex pros know the difference between
// <strong>greedy</i> and <i>lazy</strong> matching."

//solve by making the repetition metacharacter lazy 
input.replace(/<i>(.*?)<\/i>/ig, '<strong>$1</strong>');

//all repetition metacharacters can be made lazy, but usually only * and + in practice


//BACKREFERENCES

//groups are numbered from left to right

let promo = "Opening for XAAX is the dynamic GOOG!  At the box office now!";
let bands = promo.match(/(?:[A-Z])(?:[A-Z])\2\1/g);

console.log(promo);
console.log(bands);

//great for matching quotation marks

//we use double backticks here bc we're using single and double quotation marks
html = `<img alt='A "simple" example.'>` +
         `<img alt="Don't abuse it!">`;
console.log(html);
console.log(html.match(/<img alt=(?:['"]).*?\1/g));

//the first group matches either a single or double quote, followed by zero or more characters (note the ? making that match lazy), followed by \1, which will be whatever the first match was, either single or double quote


//REPLACING GROUPS

//strip out everything except the href in an <a> tag

html = '<a class="nope" href="/yep">Yep</a>';
console.log(html);
console.log(html.replace(/<a .*?(href=".*?").*?>/, '<a $1>'));

//preserve the class and href, and reverse order so href always comes first
html = '<a class="yep" href="/yep" id="nope">Yep</a>';
console.log(html);
console.log(html.replace(/<a .*?(class=".*?").*?(href=".*?").*?>/, '<a $2 $1>'));

//in addition to $1 and $2, there are 
//    $` (everythign before the match) 
//    $& (the match itself) 
//    $' (everything after the match) 
//    $$ (literal dollar sign)

input = "One two three";
console.log(input);
console.log(input.replace(/two/, '($`)'));    // "One (One ) three"
console.log(input.replace(/\w+/g, '($&)'));   // "(One) (two) (three)"
console.log(input.replace(/two/, "($')"));    // "One ( three) three"
console.log(input.replace(/two/, "($$)"));    // "One ($) three"


//FUNCTION REPLACEMENTS

//Allows you to break down a very complex regex into some simpler regexes

//modifying html elements - convert all <a> links into a very specific format: preserve class, href, and id but remove everything else
//	many different input variations:

html =`<a class="foo" href="/foo" id="foo">Foo</a>\n` +
   `<A href='/foo' Class="foo">Foo</a>\n` +
   `<a href="/foo">Foo</a>\n` +
   `<a onclick="javascript:alert('foo!')" href="/foo">Foo</a>`;
	
//break up into two regexes, one to rexognise the <a> tags, and one to replace the contents of the <a> tag with only what you want.

//second part first
function sanitizeATag(aTag) {
	//get the parts of the tag
	const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
	//parts[1] are the attributes of the opening <a> tag
	//parts[2] are what's between the <a> and </a> tags
	const attributes = parts[1].split(/\s+/) //split into indivdual attributes
	return '<a ' + attributes
		.filter(attr => /^(?:class|id|href)[\s=]/i.test(attr))
		.join(' ')
		+ '>'
		+ parts[2]
		+ '</a>';
}

let aTags = html.match(/<a .*?>(.*?)<\/a>/ig);
console.log(html);
console.log(aTags);
	
//you ca pass a function to replace!

html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset) {
	console.log(`<a> tag found at ${offset}. contents: ${g1}`);
});
	
//the function you pass to replace receives the following arguments in order:
// 1. the entire matched string (equivalent to $&)
// 2. the matched groups (if any).  There will be as many of these arguments as there are groups
// 3. the offset of the match within the orignal string
// 4. the original string (rarely used)

//the return value of the function is what gets replaced in the returned string (undefined if no return like above)

html.replace(/<a .*?>(.*?)<\/a>/ig, function(m) {
	let rep = sanitizeATag(m);
	console.log(rep)
	return rep;
});

//further simplification:
html.replace(/<a .*?>(.*?)<\/a>/ig, sanitizeATag);
	
	
//ANCHORING

//when you care about the beginning or end of a string, or the entire string
//two anchors:
// 1. ^ (matches the beginning of the line)
// 2. $ (matches the end of the line)

input = "It was the best of times, it was the worst of times";
let beginning = input.match(/^\w+/g); // "It"
let end = input.match(/\w+$/g);       // "times"
let everything = input.match(/^.*$/g);// same as input
let nomatch1 = input.match(/^best/ig);
let nomatch2 = input.match(/worst$/ig);

//anchors match beginning or end of whole string, ignoring newlines
//to treat string as multiline, use the m (multiline) option:

input = "One line\nTwo lines\nthree lines\nfour";
let beginnings = input.match(/^\w+/mg);  // ["One","Two","Three","Four"]
let endings = input.match(/\w+$/mg);     // ["line","lines","lines","Four"]


//WORD BOUNDARY MATCHING

//word boundary metacharacter \b and the inverse \B do not consume input

//a word boundary is defined where a \w match is either preceeded by or followed by a \w (nonword) character, or the beginning or end of the string

//example: you're trying to replace email addresses in English text with hyperlinks
//situations to consider:

inputs = [
    "john@doe.com",                 // nothing but the email
    "john@doe.com is my email",     // email at the beginning
    "my email is john@doe.com",     // email at the end
    "use john@doe.com, my email",   // email in the middle, with comma afterward
    "my email:john@doe.com.",       // email surrounded with punctuation
];
	
//they all exist at word boundaries
//since they don't consume input, we don't have to worry about putting the back in the replacement string

const emailMatcher = /\b[a-z][a-z0-9._-]*@[a-z][a-z0-9_-]+\.[a-z]+(?:\.[a-z]+)?\b/ig;

console.log(inputs);
const emailOutputs = inputs.map(s => s.replace(emailMatcher, '<a href="mailto:$&">$&</a>'));
console.log(emailOutputs);
	

//LOOKAHEADS

//don't consume input
//they are general purpose, you can match any subexpression without consuming it
//saves you from putting things back in replacement
//necessary for overlapping content, and can simplify certain types of matching

//example: validating a password matches some policy
//password must contain at least one uppercae letter, number, and lowercase letter, and no nonletter, nonnumber characters

//we could use multiple regexs

function validPassword(p) {
	return /[A-Z]/.test(p) &&
		/[0-9]/.test(p) &&
		/[a-z]/.test(p) &&
		!/[^a-zA-Z0-9]/.test(p);
}

//we want to combine into one expression, not easy
//lookaheads will help here
//  an independent regex that doesn't consume any input
//  (?=<subexpression>)
//  (?!<subexpression>) - negative lookahead

function validPassword2(p) {
	return /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?!.*[^a-zA-Z0-9])/.test(p);
}
	

//CONSTRUCTING REGEXES DYNAMICALLY

//use the RegExp constructor
//when we need to construct them dynamically, like using an array of usernames to match a string
//no sensible way to do that in a regex literal

let users = ["mary","nick","arthur","sam","yvette"];
let someText = "User @arthur started the backup and 15:15, and @nick and @yvette restored it as 18:35.";
const userRegex = new RegExp(`@(?:${users.join('|')})\\b`, 'g');
console.log(someText.match(userRegex)); // [ "@arthur", "@nick", "@yvette" ]
	
	
	
	
	
	
	
	
	
	
	
	