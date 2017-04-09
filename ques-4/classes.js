var Girl = require('../old/classes.js').Girl;
var Boy = require('../old/classes.js').Boy;
var Gift = require('../old/classes.js').Gift;

module.exports = {
    Girl: class Girl {
        /**
         * Creates an instance of Girl.
         * 
         * @param {String} name 
         * @param {Integer} rating 
         * @param {Integer} maintainenceBudget 
         * @param {Integer} intelligence 
         * @param {Boolean} isCommited 
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
         * 
         * @param {String} name 
         * @param {Integer} attractiveness 
         * @param {Integer} intelligence 
         * @param {Integer} budget 
         * @param {Integer} minRating 
         * @param {Boolean} isCommited 
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
         * 
         * @param {Integer} id 
         * @param {Integer} price 
         * @param {Integer} value 
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
         * 
         * @param {String} name 
         * @param {Integer} rating 
         * @param {Integer} maintainenceBudget 
         * @param {Integer} intelligence 
         * @param {Boolean} isCommited 
         */
        constructor(name, rating, maintainenceBudget, intelligence, isCommited) {
            super(name, rating, maintainenceBudget, intelligence, 'attractive', isCommited);
            this.criteriaToDate = 'attractive';
        }
    },
    GirlByRich: class GirlByRich extends Girl {
        /**
         * Creates an instance of GirlByRich.
         * 
         * @param {String} name 
         * @param {Integer} rating 
         * @param {Integer} maintainenceBudget 
         * @param {Integer} intelligence 
         * @param {Boolean} isCommited 
         */
        constructor(name, rating, maintainenceBudget, intelligence, isCommited) {
            super(name, rating, maintainenceBudget, intelligence, 'rich', isCommited);
            this.criteriaToDate = 'rich';
        }
    },
    GirlByIntelligent: class GirlByIntelligent extends Girl {
        /**
         * Creates an instance of GirlByIntelligent.
         * 
         * @param {String} name 
         * @param {Integer} rating 
         * @param {Integer} maintainenceBudget 
         * @param {Integer} intelligence 
         * @param {Boolean} isCommited 
         */
        constructor(name, rating, maintainenceBudget, intelligence, isCommited) {
            super(name, rating, maintainenceBudget, intelligence, 'intelligent', isCommited);
            this.criteriaToDate = 'intelligent';
        }
    },
    LuxuryGift: class LuxuryGift extends Gift {
        /**
         * Creates an instance of LuxuryGift.
         * 
         * @param {Integer} id 
         * @param {Integer} price 
         * @param {Integer} value 
         */
        constructor(id, price, value) {
            super(id, price, value, 'Luxury');
            this.type = 'Luxury';
        }
    },
    EssentialGift: class EssentialGift extends Gift {
        /**
         * Creates an instance of EssentialGift.
         * 
         * @param {Integer} id 
         * @param {Integer} price 
         * @param {Integer} value 
         */
        constructor(id, price, value) {
            super(id, price, value, 'Essential');
            this.type = 'Essential';
        }
    },
    UtilityGift: class UtilityGift extends Gift {
        /**
         * Creates an instance of UtilityGift.
         * 
         * @param {Integer} id 
         * @param {Integer} price 
         * @param {Integer} value 
         */
        constructor(id, price, value) {
            super(id, price, value, 'Utility');
            this.type = 'Utility';
        }
    }
}