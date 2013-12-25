Crafty.c("Item", {

    init: function () {
        this.requires('Actor');
        this.itemScore = 1;
    },

    score: function (score) {
        this.itemScore = score;
    },

    // Process a visitation with this village
    grab: function () {
        this.destroy();
        Crafty.trigger('ScoreUp', this.itemScore);
    }
});