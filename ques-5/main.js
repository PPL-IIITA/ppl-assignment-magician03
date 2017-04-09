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

girls.sort(function (a, b) {
    return b.rating - a.rating;
});

boys.sort(function (a, b) {
    return b.attractiveness - a.attractiveness;
});

//allocate the couples according to criteria
lib.alternatlyAllocateCouples(girls, boys, couples, brokeUp);

console.log('\n------couples formed------\n');
console.log(couples);

//distribue gits and calculate the happines of couples
lib.distribGiftsAndCalcHappiness(couples, girls, boys, gifts);

var k = Math.floor(Math.random() * (5 - 2)) + 2;

couples.sort(function (a, b) {
    return b.happiness - a.happiness;
});

console.log("\n----sorted order acc to happiness-----\n");
for (i = 0; i < k; i++) {
    console.log(couples[i].boyDesc.name + "  <=>  " + couples[i].girlDesc.name);
}