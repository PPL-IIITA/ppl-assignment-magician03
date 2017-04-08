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

//distribue gits and calculate the happines of couples
lib.distribGiftsAndCalcHappiness(couples, girls, boys, gifts);

var k = Math.floor(Math.random() * (5 - 2)) + 2;

lib.performBreakUp(couples, boys, girls, k, brokeUp);

console.log('--------couples who broke up----\n');
console.log(brokeUp);
console.log('\n------couples newly formed------\n');
console.log(couples);