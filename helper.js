var Girl = require('./classes.js').Girl;
var Boy = require('./classes.js').Boy;
var Gift = require('./classes.js').Gift;

module.exports = {

    allocateCouples : function(girls, boys) {
        /*
            function to allocate couples
            param   girls   object
            param   boys    object
            return couples  object
        */
        var gi = 0;
        var bi = 0;
        var commits = 0;
        const girlCommitTypes = ["choosy", "normal", "desperate"];
        const boyCommitTypes = ["miser", "generous", "geeks"];
        var couples = [];
        while (commits < girls.length) {
            var girl = girls[gi];
            var boy = boys[bi];
           // console.log(boy);
            //console.log(girl);
            var couple = {};
            if(boy.isCommited == false && girl.isCommited == false && (boy.budget >= girl.maintainenceBudget) 
                && (girl.rating >= boy.minRating)) {
                if( girl.criteriaToDate == "intelligent") {
                    if(boy.intelligence < 8) {
                        bi += 1;
                        bi = bi%(boys.length);
                        continue;
                    }
                } else if (girl.criteriaToDate == "attractive") {
                    if (boy.attractiveness < 75 ) {
                        bi += 1;
                        bi = bi%(boys.length);
                        continue;
                    }
                } else if (girl.criteriaToDate == "rich") {
                    if (boy.budget < 7500 ) {
                        bi += 1;
                        bi = bi%(boys.length);
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
                bi = bi%(boys.length);
                gi = gi%(girls.length);
                //console.log(couple);
                couples.push(couple);
            } else {
                //gi += 1;
                bi += 1;
                bi = bi%(boys.length);
                //gi = gi%(girls.length);
            }
                
        }

        return couples;
    },

    initiateGirls : function(girlInput) {
        //initiate the girls object from data
        var girls = [];
        for(i = 0; i < girlInput.length; i++) {
            girls[i] = new Girl(girlInput[i].name, girlInput[i].rating, girlInput[i].maintainenceBudget, 
                                    girlInput[i].intelligence, girlInput[i].criteriaToDate, girlInput[i].isCommited);
        }
        return girls;
    },

    initiateBoys : function(boyInput) {
        //initiate boys object from data
        var boys = [];
        for(i = 0; i < boyInput.length; i++) {
            boys[i] = new Boy(boyInput[i].name, boyInput[i].attractiveness, boyInput[i].intelligence,
                                boyInput[i].budget, boyInput[i].minRating, boyInput[i].isCommited);
        }
        return boys;
    },

    initiateGifts : function(giftInput) {

        var gifts = [];
        for(i = 0; i < giftInput.length; i++) {
            gifts[i] = new Gift(giftInput[i].id, giftInput[i].price, giftInput[i].value, giftInput[i].type);
        }

        gifts.sort(function(a, b) {
            return a.price - b.price;
        });

        return gifts;
    },

    distribGiftsAndCalcHappiness : function(couples, girls, boys, gifts) {
        //console.log(gifts);
        for(i = 0; i < couples.length; i++) {
            var couple = couples[i];
            var boyHappines;
            var girlHappines;
            var coupleHappines;
            var giftList = [];
            var moneySpent = 0;
            var giftValue = 0;
            var max = 0;
            if (couple.boyDesc.commitType == "miser"){
                max = couple.girlDesc.maintainenceBudget;
            } else if (couple.boyDesc.commitType == "generous") {
                max = couple.boyDesc.budget;
            } else if (couple.boyDesc.commitType == "geeks") {
                max = couple.girlDesc.maintainenceBudget;
            }

            var gi = 0;
            while (moneySpent < max) {
                //console.log(gifts[gi]);
                giftList.push(gifts[gi]);
                moneySpent += gifts[gi].price;
                giftValue += gifts[gi].value;
                gi += 1;
                gi = gi%(gifts.length);
            }

            if(couple.girlDesc.commitType == "choosy") {
                // TODO: minor correction needed, need to add the value of luxury gifts. 
                girlHappines =  Math.log(moneySpent/couple.girlDesc.maintainenceBudget);
            } else if (couple.girlDesc.commitType == "normal") {
                girlHappines = moneySpent/couple.girlDesc.maintainenceBudget;
                girlHappines += giftValue;
            } else if (couple.girlDesc.commitType == "desperate") {
                girlHappines = moneySpent/couple.girlDesc.maintainenceBudget;
            }

            if (couple.boyDesc.commitType == "miser"){
                boyHappines = couple.boyDesc.budget - moneySpent;
            } else if (couple.boyDesc.commitType == "generous") {
                boyHappines = girlHappines;
            } else if (couple.boyDesc.commitType == "geeks") {
                boyHappines = couple.girlDesc.intelligence;
            }

            couple.happiness = boyHappines + girlHappines;
            couple.boyDesc.happines = boyHappines;
            couple.girlDesc.happines = girlHappines;
            couple.moneySpent = moneySpent;
            couple.giftValue = giftValue;
            couple.giftList = giftList;

            couple.compatibility = (couple.boyDesc.budget - couple.girlDesc.maintainenceBudget)
                                + Math.abs(couple.boyDesc.attractiveness - couple.girlDesc.rating)
                                + Math.abs(couple.boyDesc.intelligence - couple.girlDesc.intelligence);

        }
    }
}