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

var randomBoys = [];
lib.generateRandomBoys(randomBoys);
lib.printGirlFriends(randomBoys, couples);