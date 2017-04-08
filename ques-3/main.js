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

//allocate the couples according to criteria
var couples = lib.allocateCouples(girls, boys);

console.log("---couples allocated-----\n");
console.log(couples);

//distribue gits and calculate the happines of couples
lib.distribGiftsAndCalcHappiness(couples, girls, boys, gifts);

console.log("\n-----printing gifts exchanged and other data-------\n");
for (i = 0; i < couples.length; i++) {
    var obj = {};
    obj.commitId = couples[i].commitId;
    obj.boy = couples[i].boyDesc.name;
    obj.girl = couples[i].girlDesc.name;
    obj.happiness = couples[i].happiness;
    obj.compatibility = couples[i].compatibility;
    obj.giftList = couples[i].giftList;
    console.log(obj);
}

var k = Math.floor(Math.random() * (5 - 2)) + 2;

couples.sort(function (a, b) {
    return b.happiness - a.happiness;
});

console.log("\n----sorted order acc to happiness-----\n");
for (i = 0; i < k; i++) {
    console.log(couples[i].boyDesc.name + "  <=>  " + couples[i].girlDesc.name);
}

couples.sort(function (a, b) {
    return b.compatibility - a.compatibility;
});

console.log("\n----sorted order acc to compatibility-----\n");
for (i = 0; i < k; i++) {
    console.log(couples[i].boyDesc.name + "  <=>  " + couples[i].girlDesc.name);
}