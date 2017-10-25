//DATE OBJECT

const d = new Date();
console.log(d);
console.log(d.valueOf()); //milliseconds

//constructing date objects

//without arguments => current date
new Date();
//provide a string to parse
new Date('June 14, 1903');
//specify a local date in milliseconds
new Date(0);
new Date(100000000);
//define the year, month, day, hours, min, seconds, milliseconds (months are 0 based)
new Date(2015,0,14,10,0,0);


//**NO WAY TO SPECIFY THE TIMEZONE
//always stored in UTC, but format them according to local time


//MOMENT.JS

//two flavors: /w and w/o timezone support

//web based CND:
// <script src="//cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.4.0/moment-timezone.min.js"></script>

//Node:
const moment = require('moment-timezone');

//constructing dates with timezones on a server
//better to use UTC or explicitly specifying the time zone

const utcDate = new Date(Date.UTC(2016, 4, 27));
console.log("UTC DATE: " + utcDate);

//use moment.js to construct Date instances using a specific timezone
const fromMoment = moment.tz([2016,0,27,9,19], 'America/Los_Angeles').toDate();
//toDate() converts it to Date object
console.log(fromMoment);

//BROWSER
//generally JS's default behavior is appropriate for the browser
//if not, use moment


//TRANSMITTING DATES











