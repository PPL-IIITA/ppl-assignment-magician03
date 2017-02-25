var Girl = require('./classes.js').Girl;
var Boy = require('./classes.js').Boy;
var girlInput = require('./data.json').girls;
var boyInput = require('./data.json').boys;
var giftInput = require('./data.json').gifts;
var lib = require('./helper.js');
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/output.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { 
    
  log_file.write(util.format(d) + '\n');
  //log_stdout.write(util.format(d) + '\n');
};



var girls = lib.initiateGirls(girlInput);
var boys = lib.initiateBoys(boyInput);
var gifts = lib.initiateGifts(giftInput);

var couples = lib.allocateCouples(girls, boys);


console.log("---couples allocated-----");
console.log(couples);


lib.distribGiftsAndCalcHappiness(couples, girls, boys, gifts);

console.log("\n-----printing gifts exchanged and other data-------");
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

var k = 2;

couples.sort(function(a, b) {
            return a.happiness - b.happiness;
});

console.log("\n----sorted order acc to happiness");
for( i = 0; i < k; i++) {
    console.log(couples[i].boyDesc.name + "  <=>  " + couples[i].girlDesc.name);
}

couples.sort(function(a, b) {
            return a.compatibility - b.compatibility;
});

console.log("\n----sorted order acc to compatibility");
for( i = 0; i < k; i++) {
    console.log(couples[i].boyDesc.name + "  <=>  " + couples[i].girlDesc.name);
}







