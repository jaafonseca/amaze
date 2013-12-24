// Goal is a little house that the PC must reach to complete the level
Crafty.c('Goal', {
    init: function() {
        this.requires('Actor, spr_village');
    },

    // Process a visitation with this village
    hit: function() {
        this.destroy();
        Crafty.trigger('GoalReached', this);
    }
});