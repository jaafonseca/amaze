Crafty.c("Item", {

    init: function () {
        this.requires('Actor');
        this.itemScore = 1;
        this.foodAmount = 0;
    },

    score: function (score) {
        this.itemScore = score;
        return this;
    },

    food: function (foodAmount) {
        this.foodAmount = foodAmount;
        return this;
    },

    // Process a visitation with this village
    grab: function () {
        this.destroy();
        Crafty.trigger('ScoreUp', {score: this.itemScore, food: this.foodAmount});
    }
});