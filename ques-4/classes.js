var Girl = require('../old/classes.js').Girl;
var Boy = require('../old/classes.js').Boy;
var Gift = require('../old/classes.js').Gift;

module.exports = {
    Girl: class Girl {
        /**
         * Creates an instance of Girl.
         * @param {any} name 
         * @param {any} rating 
         * @param {any} maintainenceBudget 
         * @param {any} intelligence 
         * @param {any} isCommited 
         */
        constructor(name, rating, maintainenceBudget, intelligence, isCommited) {
            this.name = name;
            this.rating = rating;
            this.maintainenceBudget = maintainenceBudget;
            this.intelligence = intelligence;
            this.isCommited = isCommited;
        }
    },

    Boy: class Boy {
        /**
         * Creates an instance of Boy.
         * @param {any} name 
         * @param {any} attractiveness 
         * @param {any} intelligence 
         * @param {any} budget 
         * @param {any} minRating 
         * @param {any} isCommited 
         */
        constructor(name, attractiveness, intelligence, budget, minRating, isCommited) {
            this.name = name;
            this.attractiveness = attractiveness;
            this.intelligence = intelligence;
            this.budget = budget;
            this.minRating = minRating;
            this.isCommited = isCommited;
        }
    },

    Gift: class Gift {
        /**
         * Creates an instance of Gift.
         * @param {any} id 
         * @param {any} price 
         */
        constructor(id, price, value) {
            this.id = id;
            this.price = price;
            this.value = value;
        }
    },
    GirlByAttractive: class GirlByAttractive extends Girl {
        /**
         * Creates an instance of GirlByAttractive.
         * @param {any} name 
         * @param {any} rating 
         * @param {any} maintainenceBudget 
         * @param {any} intelligence 
         * @param {any} isCommited 
         */
        constructor(name, rating, maintainenceBudget, intelligence, isCommited) {
            super(name, rating, maintainenceBudget, intelligence, 'attractive', isCommited);
            this.criteriaToDate = 'attractive';
        }
    },
    GirlByRich: class GirlByRich extends Girl {
        /**
         * Creates an instance of GirlByRich.
         * @param {any} name 
         * @param {any} rating 
         * @param {any} maintainenceBudget 
         * @param {any} intelligence 
         * @param {any} isCommited 
         */
        constructor(name, rating, maintainenceBudget, intelligence, isCommited) {
            super(name, rating, maintainenceBudget, intelligence, 'rich', isCommited);
        }
    },
    GirlByIntelligent: class GirlByIntelligent extends Girl {
        /**
         * Creates an instance of GirlByIntelligent.
         * @param {any} name 
         * @param {any} rating 
         * @param {any} maintainenceBudget 
         * @param {any} intelligence 
         * @param {any} isCommited 
         */
        constructor(name, rating, maintainenceBudget, intelligence, isCommited) {
            super(name, rating, maintainenceBudget, intelligence, 'intelligent', isCommited);
        }
    },
    LuxuryGift: class LuxuryGift extends Gift {
        /**
         * Creates an instance of LuxuryGift.
         * @param {any} id 
         * @param {any} price 
         * @param {any} value 
         */
        constructor(id, price, value) {
            super(id, price,value, 'Luxury');
        }
    },
    EssentialGift: class EssentialGift extends Gift {
        /**
         * Creates an instance of EssentialGift.
         * @param {any} id 
         * @param {any} price 
         * @param {any} value 
         */
        constructor(id, price, value) {
            super(id, price,value, 'Essential');
        }
    },
    UtilityGift: class UtilityGift extends Gift {
        /**
         * Creates an instance of UtilityGift.
         * @param {any} id 
         * @param {any} price 
         * @param {any} value 
         */
        constructor(id, price, value) {
            super(id, price, value, 'Utility');
        }
    },



}