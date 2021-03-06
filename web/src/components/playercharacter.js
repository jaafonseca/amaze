// This is the player-controlled character
Crafty.c('PlayerCharacter', {

    init: function () {
        this.requires("Actor, SpriteAnimation, spr_player, Multiway, Keyboard, Collision")
            .attr({x: 16, y: 16, z: 1000})
            .animate('PlayerMovingUp', 0, 0, 2)
            .animate('PlayerMovingRight', 0, 1, 2)
            .animate('PlayerMovingDown', 0, 2, 2)
            .animate('PlayerMovingLeft', 0, 3, 2)
            .collision()
            .setMultiway()
            .bind('Moved', function (from) {
                if (this.hit('Obstacle')) {
                    this.attr({x: from.x, y: from.y});
                }
            })
            .bind("NewDirection", function (data) {


                if (data.x > 0) {
                    this.animate('PlayerMovingRight', 1, -1);
                } else if (data.x < 0) {
                    this.animate('PlayerMovingLeft', 1, -1);
                } else if (data.y > 0) {
                    this.animate('PlayerMovingDown', 1, -1);
                } else if (data.y < 0) {
                    this.animate('PlayerMovingUp', 1, -1);
                } else {
                    this.stop();
                }
            })
            .onHit('Goal', this.touchGoal)
            .onHit('Spice', this.speedUp)
            .onHit('Item', this.grabItem);

        return this;
    },

    touchGoal: function (data) { // hit the goal
        data[0].obj.reach();
    },

    grabItem: function (data) { // hit the item
        data[0].obj.grab();
    },

    speedUp: function () { // hit a spice item
        Game.maze.speed = 4;
        this.setMultiway();
        this.timeout(function () {
            Game.maze.speed = 2;
//            this.setMultiway();
        }, 3000);
    },

    setMultiway: function () {
        this.multiway(Game.maze.speed, {UP_ARROW: -90, RIGHT_ARROW: 0, DOWN_ARROW: 90, LEFT_ARROW: -180});
        return this;
    }
});