module.exports = {
    Girl : class Girl {
            constructor(name, rating, maintenanceBudget, intelligence, criteriaToDate, isCommited) {
                this.name = name;
                this.rating = rating;
                this.maintenanceBudget = maintenanceBudget;
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
        constructor(id, price, value, giftType) {
            this.id = id;
            this.price = price;
            this.value = value;
            this.type = giftType;
        }
    }

}