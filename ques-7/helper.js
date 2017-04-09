var Girl = require('./classes.js').Girl;
var Boy = require('./classes.js').Boy;
var Gift = require('./classes.js').Gift;
var UtilityGift = require('./classes.js').UtilityGift;
var EssentialGift = require('./classes.js').EssentialGift;
var LuxuryGift = require('./classes.js').LuxuryGift;
var GirlByAttractive = require('./classes.js').GirlByAttractive;
var GirlByRich = require('./classes.js').GirlByRich;
var GirlByIntelligent = require('./classes.js').GirlByIntelligent;

module.exports = {

    /**
     * Allocate couples
     * 
     * @param {any} girls 
     * @param {any} boys 
     * @param {any} couples 
     * @param {any} brokeUp 
     * @returns 
     */
    allocateCouples: function (girls, boys, couples, brokeUp) {
        var gi = 0;
        var bi = 0;
        var countGi = 0;

        var commits = couples.length;
        const girlCommitTypes = ["choosy", "normal", "desperate"];
        const boyCommitTypes = ["miser", "generous", "geeks"];
        while (commits < girls.length && gi < girls.length) {

            var girl = girls[gi];
            var boy = boys[bi];
            var breakUpFlag = 0;
            var couple = {};
            if (boy.isCommited === false && girl.isCommited === false && (boy.budget >= girl.maintenanceBudget) &&
                (girl.rating >= boy.minRating)) {
                if (girl.criteriaToDate == "intelligent") {
                    if (boy.intelligence < 50) {
                        bi += 1;
                        bi = bi % (boys.length);
                        countGi += 1;
                        if (countGi >= boys.length) {
                            gi += 1;
                            countGi = 0;
                        }
                        continue;
                    }
                } else if (girl.criteriaToDate == "attractive") {
                    if (boy.attractiveness < 50) {
                        bi += 1;
                        bi = bi % (boys.length);
                        countGi += 1;
                        if (countGi >= boys.length) {
                            gi += 1;
                            countGi = 0;
                        }
                        continue;
                    }
                } else if (girl.criteriaToDate == "rich") {
                    if (boy.budget < 5000) {
                        bi += 1;
                        bi = bi % (boys.length);
                        countGi += 1;
                        if (countGi >= boys.length) {
                            gi += 1;
                            countGi = 0;
                        }
                        continue;
                    }
                }

                for (var i = 0; i < brokeUp.length; i++) {
                    if (boys.indexOf(brokeUp[i].boyDesc) == bi) {
                        bi += 1;
                        bi = bi % (boys.length);
                        countGi += 1;
                        if (countGi >= boys.length) {
                            gi += 1;
                            countGi = 0;
                        }
                        breakUpFlag = 1;
                        break;
                    }
                }

                if (breakUpFlag == 1) continue;

                //console.log(girls[gi].name + ' ' + boys[bi].name);
                boy.isCommited = true;
                girl.isCommited = true;
                girl.commitType = girlCommitTypes[Math.floor(Math.random() * 3)];
                boy.commitType = boyCommitTypes[Math.floor(Math.random() * 3)];
                commits += 1;
                couple.commitId = commits;
                couple.boyDesc = boy;
                couple.girlDesc = girl;
                gi += 1;
                bi += 1;
                bi = bi % (boys.length);
                gi = gi % (girls.length);
                couples.push(couple);
            } else {
                bi += 1;
                bi = bi % (boys.length);
                countGi += 1;
                if (countGi >= boys.length) {
                    gi += 1;
                    countGi = 0;
                }
            }

        }

        return;
    },

    /**
     * Initiates three types of girls from inheritance classes
     * 
     * @returns {Object} girls 
     */
    initiateGirls: function () {
        //initiate the girls object
        var girl = {};
        var girls = [];

        for (var i = 0; i < 10; i++) {
            for (j = 0; j < 3; j++) {
                girl.name = 'girl' + (3 * i + j + 1);
                girl.rating = Math.floor(Math.random() * (75 - 30)) + 30;
                girl.maintenanceBudget = Math.floor(Math.random() * (5000 - 2500)) + 2500;
                girl.intelligence = Math.floor(Math.random() * (70 - 10)) + 10;
                girl.isCommited = false;

                if (j === 0) {
                    girls[3 * i + j] = new GirlByAttractive(girl.name, girl.rating, girl.maintenanceBudget,
                        girl.intelligence, girl.isCommited);
                } else if (j == 1) {
                    girls[3 * i + j] = new GirlByRich(girl.name, girl.rating, girl.maintenanceBudget,
                        girl.intelligence, girl.isCommited);
                } else if (j == 2) {
                    girls[3 * i + j] = new GirlByIntelligent(girl.name, girl.rating, girl.maintenanceBudget,
                        girl.intelligence, girl.isCommited);
                }

            }

        }
        return girls;
    },

    /**
     * Initiates boys.
     * 
     * @returns {Object} Boys
     */
    initiateBoys: function () {
        //initiate boys object
        var boy = {};
        var boys = [];

        for (var i = 0; i < 50; i++) {
            boy.name = 'boy' + (i + 1);
            boy.attractiveness = Math.floor(Math.random() * (100 - 40)) + 40;
            boy.intelligence = Math.floor(Math.random() * (100 - 40)) + 40;
            boy.budget = Math.floor(Math.random() * (10000 - 4000)) + 4000;
            boy.minRating = Math.floor(Math.random() * (40 - 10)) + 10;
            boy.isCommited = false;

            boys[i] = new Boy(boy.name, boy.attractiveness, boy.intelligence,
                boy.budget, boy.minRating, boy.isCommited);
        }
        return boys;
    },

    /**
     * Initiates three types of Gifts
     * 
     * @returns {Object} Gifts
     */
    initiateGifts: function () {
        var gift = {};
        var gifts = [];
        var giftType = ['utility', 'essential', 'luxury'];
        var flag = 0;
        for (var i = 0; i < 20; i++) {
            gift.id = '' + (i + 1);
            gift.value = Math.floor(Math.random() * (2000 - 100)) + 100;
            gift.type = giftType[Math.floor(Math.random() * (3 - 0)) + 0];

            if (gift.type == 'luxury') {
                gift.price = Math.floor(Math.random() * (2000 - 1250)) + 1250;
                gifts[i] = new LuxuryGift(gift.id, gift.price, gift.value);
            } else {
                gift.price = Math.floor(Math.random() * (1500 - 250)) + 250;
                if (flag == 1) {
                    gifts[i] = new UtilityGift(gift.id, gift.price, gift.value);
                    flag = 0;
                } else {
                    gifts[i] = new EssentialGift(gift.id, gift.price, gift.value);
                    flag = 1;
                }
            }

            //gifts[i] = new Gift(gift.id, gift.price, gift.value, gift.type);
        }

        gifts.sort(function (a, b) {
            return a.price - b.price;
        });

        return gifts;
    },

    /**
     * Distribute gifts and calculate happiness among couples
     * 
     * @param {Object} couples 
     * @param {Object} girls 
     * @param {Object} boys 
     * @param {Object} gifts 
     */
    distribGiftsAndCalcHappiness: function (couples, girls, boys, gifts) {
        for (var i = 0; i < couples.length; i++) {
            var couple = couples[i];
            var boyhappiness;
            var girlhappiness;
            var couplehappiness;
            var giftList = [];
            var moneySpent = 0;
            var giftValue = 0;
            var max = 0;
            if (couple.boyDesc.commitType == "miser") {
                max = couple.girlDesc.maintenanceBudget;
            } else if (couple.boyDesc.commitType == "generous") {
                max = couple.boyDesc.budget;
            } else if (couple.boyDesc.commitType == "geeks") {
                max = couple.girlDesc.maintenanceBudget;
            }

            var gi = 0;
            while (moneySpent < max) {
                giftList.push(gifts[gi]);
                moneySpent += gifts[gi].price;
                giftValue += gifts[gi].value;
                gi += 1;
                gi = gi % (gifts.length);
            }

            if (couple.girlDesc.commitType == "choosy") {
                girlhappiness = Math.log(moneySpent / couple.girlDesc.maintenanceBudget);
            } else if (couple.girlDesc.commitType == "normal") {
                girlhappiness = moneySpent / couple.girlDesc.maintenanceBudget;
                girlhappiness += giftValue;
            } else if (couple.girlDesc.commitType == "desperate") {
                girlhappiness = moneySpent / couple.girlDesc.maintenanceBudget;
            }

            if (couple.boyDesc.commitType == "miser") {
                boyhappiness = couple.boyDesc.budget - moneySpent;
            } else if (couple.boyDesc.commitType == "generous") {
                boyhappiness = girlhappiness;
            } else if (couple.boyDesc.commitType == "geeks") {
                boyhappiness = couple.girlDesc.intelligence;
            }

            couple.happiness = boyhappiness + girlhappiness;
            couple.boyDesc.happiness = boyhappiness;
            couple.girlDesc.happiness = girlhappiness;
            couple.moneySpent = moneySpent;
            couple.giftValue = giftValue;
            couple.giftList = giftList;

            couple.compatibility = (couple.boyDesc.budget - couple.girlDesc.maintenanceBudget) +
                Math.abs(couple.boyDesc.attractiveness - couple.girlDesc.rating) +
                Math.abs(couple.boyDesc.intelligence - couple.girlDesc.intelligence);

        }
    },

    /**
     * Perform break up of k least happy couples and reallocate couples
     * 
     * @param {any} couples 
     * @param {any} boys 
     * @param {any} girls 
     * @param {any} k 
     * @param {any} brokeUp 
     * @returns 
     */
    performBreakUp: function (couples, boys, girls, k, brokeUp) {
        couples.sort(function (a, b) {
            return a.happiness - b.happiness;
        });

        for (var i = 0; i < k; i++) {
            couples[i].boyDesc.isCommited = false;
            couples[i].girlDesc.isCommited = false;
            boys[boys.indexOf(couples[i].boyDesc)].isCommited = false;
            girls[girls.indexOf(couples[i].girlDesc)].isCommited = false;
            brokeUp.push(couples[i]);
            couples.splice(i, 1);
        }
        module.exports.allocateCouples(girls, boys, couples, brokeUp);

        return;
    },

    /**
     * Allocate couples based of alternate preference.
     * 
     * @param {any} girls 
     * @param {any} boys 
     * @param {any} couples 
     * @param {any} brokeUp 
     */
    alternatlyAllocateCouples: function (girls, boys, couples, brokeUp) {
        var gi = 0; // index of girls array
        var bi = 0; // index of boys array
        var countGi = 0; // no of boys, girl has checked
        var altFlag = 0; // to decide its a boy's turn or girl's turn
        var commits = couples.length; //current no of couples
        const girlCommitTypes = ["choosy", "normal", "desperate"];
        const boyCommitTypes = ["miser", "generous", "geeks"];
        while (commits < girls.length && gi < girls.length) {

            var girl = girls[gi];
            var boy = boys[bi];
            var breakUpFlag = 0; // to check whether a couple have broke up in past
            var couple = {};
            if (boy.isCommited === false && girl.isCommited === false && (boy.budget >= girl.maintenanceBudget) &&
                (girl.rating >= boy.minRating)) {
                if (altFlag === 0) { // if boys turn, choose the best and switch the flag
                    altFlag = 1;
                    boy.isCommited = true;
                    girl.isCommited = true;
                    girl.commitType = girlCommitTypes[Math.floor(Math.random() * 3)];
                    boy.commitType = boyCommitTypes[Math.floor(Math.random() * 3)];
                    commits += 1;
                    couple.commitId = commits;
                    couple.boyDesc = boy;
                    couple.girlDesc = girl;
                    gi += 1;
                    bi += 1;
                    bi = bi % (boys.length);
                    gi = gi % (girls.length);
                    couples.push(couple);
                } else { // if girls turn earlier procedure
                    altFlag = 0;
                    if (girl.criteriaToDate == "intelligent") {
                        if (boy.intelligence < 50) {
                            bi += 1;
                            bi = bi % (boys.length);
                            countGi += 1;
                            if (countGi >= boys.length) {
                                gi += 1;
                                countGi = 0;
                            }
                            continue;
                        }
                    } else if (girl.criteriaToDate == "attractive") {
                        if (boy.attractiveness < 50) {
                            bi += 1;
                            bi = bi % (boys.length);
                            countGi += 1;
                            if (countGi >= boys.length) {
                                gi += 1;
                                countGi = 0;
                            }
                            continue;
                        }
                    } else if (girl.criteriaToDate == "rich") {
                        if (boy.budget < 5000) {
                            bi += 1;
                            bi = bi % (boys.length);
                            countGi += 1;
                            if (countGi >= boys.length) {
                                gi += 1;
                                countGi = 0;
                            }
                            continue;
                        }
                    }

                    for (var i = 0; i < brokeUp.length; i++) {
                        if (boys.indexOf(brokeUp[i].boyDesc) == bi) {
                            bi += 1;
                            bi = bi % (boys.length);
                            countGi += 1;
                            if (countGi >= boys.length) {
                                gi += 1;
                                countGi = 0;
                            }
                            breakUpFlag = 1;
                            break;
                        }
                    }

                    if (breakUpFlag == 1) continue;

                    //console.log(girls[gi].name + ' ' + boys[bi].name);
                    boy.isCommited = true;
                    girl.isCommited = true;
                    girl.commitType = girlCommitTypes[Math.floor(Math.random() * 3)];
                    boy.commitType = boyCommitTypes[Math.floor(Math.random() * 3)];
                    commits += 1;
                    couple.commitId = commits;
                    couple.boyDesc = boy;
                    couple.girlDesc = girl;
                    gi += 1;
                    bi += 1;
                    bi = bi % (boys.length);
                    gi = gi % (girls.length);
                    couples.push(couple);
                }

            } else {
                if (altFlag === 0) {
                    gi += 1;
                    gi = gi % (girls.length);
                    countGi = 0;
                } else {
                    bi += 1;
                    bi = bi % (boys.length);
                    countGi += 1;
                    if (countGi >= boys.length) {
                        gi += 1;
                        countGi = 0;
                    }
                }

            }

        }

        return;
    },

    /**
     * Generate random boys in feasible range
     * 
     * @param {any} randomBoys 
     * @returns 
     */
    generateRandomBoys: function (randomBoys) {
        var max = Math.floor(Math.random() * (30 - 10)) + 10;
        for(var i = 1; i < max; i++) {
            boy = 'boy' + (Math.floor(Math.random() * (49 - 0)) + 0);
            if (randomBoys.indexOf(boy) == -1) {
                randomBoys.push(boy);
            }

        }

        return ;
    },

    /**
     * 
     * 
     * @param {Array} randomBoys 
     * @param {Array} couples 
     */
    printGirlFriends: function (randomBoys, couples) {
        
        var simpleCouples = {};
        for(var i = 0; i < couples.length; i++ ) {
            simpleCouples[couples[i].boyDesc.name] = couples[i].girlDesc.name;
        }

        for(var i = 0; i < randomBoys.length; i++) {
            if(simpleCouples[randomBoys[i]]) {
                console.log(randomBoys[i] + ' is boyfriend of ' + simpleCouples[randomBoys[i]]);
            } else {
                console.log(randomBoys[i] + ' is still single please pray for him');
            }
        }

        return ;
    }
}