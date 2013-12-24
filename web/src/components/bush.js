// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
    init: function() {
        this.requires('Actor, Actor, Collision, spr_bush, Obstacle');
    }
});