var Girl = require('./classes.js').Girl;
var Boy = require('./classes.js').Boy;
var girlInput = require("./data.json").girls;
var boyInput = require("./data.json").boys;
var lib = require("./helper.js");


var girls = lib.initiateGirls(girlInput);
var boys = lib.initiateBoys(boyInput);


var couples = lib.allocateCouples(girls, boys);

console.log(couples);



