module.exports = {
    Girl : class Girl {
            constructor(name, rating, maintainenceBudget, intelligence, criteriaToDate, isCommited) {
                this.name = name;
                this.rating = rating;
                this.maintainenceBudget = maintainenceBudget;
                this.intelligence = intelligence;
                this.criteriaToDate = criteriaToDate;
                this.isCommited = isCommited;
            }

        },

    Boy : class Boy {
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
        constructor(price, value, boyName, girlName, giftType) {
            this.price = price;
            this.value = value;
            this.fromBoy = boyName;
            this.toGirl = girlName;
            this.type = giftType;
        }
    }

}