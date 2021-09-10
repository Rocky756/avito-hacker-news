const formatDistanceToNow = require('date-fns/formatDistanceToNow')
const millisecondsToHours = require('date-fns/millisecondsToHours')
const millisecondsToMinutes = require('date-fns/millisecondsToMinutes')

const sec = 1175714200;
const milSec = sec*1000;
const time = new Date(milSec)
console.log(time);
const showTime = formatDistanceToNow(time, {includeSeconds: true})

console.log(showTime);




const res = formatDistanceToNow(dateInMs, {includeSeconds: true});

console.log(res);
