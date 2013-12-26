Crafty.c('Goal', {

    init: function () {
        this.requires('Actor, Scroll');
    },

    reach: function () {
        this.destroy();
        Crafty.trigger('GoalReached', this);
    }
});