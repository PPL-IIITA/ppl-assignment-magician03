var Girl = require('./classes.js').Girl;
var Boy = require('./classes.js').Boy;
var lib = require('./helper.js');
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/output.log', {
    flags: 'w'
});


/**
 * Over-ride default console.log() function
 * 
 * @param {any} msg 
 */
console.log = function (msg) {
    log_file.write(util.format(msg) + '\n');
};

var girls = lib.initiateGirls();
var boys = lib.initiateBoys();
var gifts = lib.initiateGifts();
var brokeUp = [];
var couples = [];


//allocate the couples according to criteria
lib.allocateCouples(girls, boys, couples, brokeUp);

console.log('\n------couples formed------\n');
console.log(couples);

//distribue gits and calculate the happines of couples
lib.distribGiftsAndCalcHappiness(couples, girls, boys, gifts);

//assuming a couple atleast will have "fun" for 4 days and atmost for 15 days
var t = Math.floor(Math.random() * (7 - 2)) + 2;

for( var i = 0; i < t; i++) {
    lib.performBreakUp(couples, boys, girls, t, brokeUp);
    console.log('\n------couples newly formed------\n');
    console.log(couples);
}