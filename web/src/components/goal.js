Crafty.c('Goal', {

    init: function () {
        this.requires('Actor, icon_scroll');
    },

    reach: function () {
        this.destroy();
        Crafty.trigger('GoalReached', this);
    }
});