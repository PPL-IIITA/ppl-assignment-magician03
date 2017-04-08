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
     * Allocates Couples according to question criteria
     * 
     * @param {object} girls 
     * @param {object} boys 
     * @returns {object} couples
     */
    allocateCouples: function (girls, boys) {
        var gi = 0;
        var bi = 0;
        var countGi = 0;
        var commits = 0;
        const girlCommitTypes = ["choosy", "normal", "desperate"];
        const boyCommitTypes = ["miser", "generous", "geeks"];
        var couples = [];
        while (commits < girls.length) {
            
            var girl = girls[gi];
            var boy = boys[bi];
            
            var couple = {};
            if (boy.isCommited == false && girl.isCommited == false && (boy.budget >= girl.maintenanceBudget) &&
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
            }
            if (countGi >= boys.length) {
                gi += 1;
                countGi = 0;
            }

        }

        return couples;
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

        for (i = 0; i < 10; i++) {
            for (j = 0; j < 3; j++) {
                girl.name = 'girl' + (i + 1);
                girl.rating = Math.floor(Math.random() * (75 - 30)) + 30;
                girl.maintenanceBudget = Math.floor(Math.random() * (5000 - 2500)) + 2500;
                girl.intelligence = Math.floor(Math.random() * (70 - 10)) + 10;
                girl.isCommited = false;

                if (j === 0) {
                    girls[i + j] = new GirlByAttractive(girl.name, girl.rating, girl.maintenanceBudget,
                        girl.intelligence, girl.isCommited);
                } else if (j == 1) {
                    girls[i + j] = new GirlByRich(girl.name, girl.rating, girl.maintenanceBudget,
                        girl.intelligence, girl.isCommited);
                } else if (j == 2) {
                    girls[i + j] = new GirlByIntelligent(girl.name, girl.rating, girl.maintenanceBudget,
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

        for (i = 0; i < 50; i++) {
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
        for (i = 0; i < 20; i++) {
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
        for (i = 0; i < couples.length; i++) {
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
    }
}