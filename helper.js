var Girl = require('./classes.js').Girl;
var Boy = require('./classes.js').Boy;

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
            console.log(boy);
            console.log(girl);
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

                couple.boy = boy.name;
                couple.girl = girl.name;
                boy.isCommited = true;
                girl.isCommited = true;
                girl.commitType = girlCommitTypes[Math.floor(Math.random() * 3)];
                boy.commitType = boyCommitTypes[Math.floor(Math.random() * 3)];
                commits += 1;
                couple.commitId = commits;
                boy.commitId = commits;
                girl.commitId = commits;
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
    }
}