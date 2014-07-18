

function daySeconds(ms) {
  return (ms? 1000 : 1) * 60 * 60 * 24;
}
function weekHours() {
  
}
function weekSeconds(ms) {
  return 7 * daySeconds(ms);
}
function currentDayNumber(date) {
  if (date && typeof date === 'string' && date !== "") {
    instance = new Date(date);
  } else {
    instance = new Date();
  }
  var now = instance.getTime(),
      start = instance.setMonth(0,0)
      diff = now - start;

  return (diff / daySeconds(true)) | 0
}
function yearWeeks() {
  return (leapYear() / 7) | 0
}
function currentWeekNumber() {
  return (currentDayNumber() / 7) +1 | 0
}
function yearSeconds(year, ms) {
  if (!year) {
    ms = year;
    year = false;
  }
  return yearDays(year) * daySeconds(ms);
}
function leapYear(year) {
  year = year || new Date();
  year = year instanceof Date ? year.getFullYear() : year;
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function yearDays(year) {
  return leapYear(year) ? 366 : 365;
}
console.log(currentDayNumber("August 07, 2015") === 218)

/*
console.log('Day seconds', daySeconds())
console.log('Week hours', weekHours())
console.log('Week seconds', weekSeconds())
*/

function weeks_between(date2) {
  // The number of milliseconds in one week
  var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
  // Convert both dates to milliseconds
  var date1_ms = new Date(now.getFullYear(), 0, 0);
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to weeks and return hole weeks
  return difference_ms / ONE_WEEK | 0;
}


/*
console.log(24 * 7, '//=> 168, hours in week');
console.log(60 * 60 * 24, '//=> 86400, seconds in day');
console.log(60 * 60 * 24 * 7, '//=> 604800, seconds in week');
console.log(604800 / (60 * 60), '//=> 168, hours in week from seconds in week);

var _now = new Date();
var _start = new Date(now.getFullYear(), 0, 0);
var _diff = now - start;
var _oneDay = 1000 * 60 * 60 * 24;
var _day = Math.floor(diff / oneDay);

// npm: week-hours
function weekHours() {
  return 7 * 24;
}

// npm: week-seconds
function weekSeconds(ms) {
  return (ms? 1000 : 1) * 60 * 60 * weekHours();
}



var final = start.toLocaleString();
console.log((new Date(final)))
*/