// This is the player-controlled character
Crafty.c('PlayerCharacter', {

    init: function () {

        this.requires("Actor, SpriteAnimation, Ogre, Multiway, Keyboard, Collision")
            .attr({x: Game.view.width / 4, y: Game.view.height / 2})
            .animate("walk_w", 0, 0, 2)
            .animate("walk_s", 0, 1, 2)
            .animate("walk_q", 0, 3, 2)
            .animate("walk_a", 0, 2, 2)
            .collision(new Crafty.polygon([5, 30], [10, 30], [10, 35], [5, 35]))
            .multiway(1, {Q: 225, W: -45, S: 45, A: 135})
            .bind('Moved', function (from) {

                if (this.hit('Bridge')) {

                } else if (this.hit('Obstacle')) {
                    this.attr({x: from.x, y: from.y});
                }

                this.z = Math.floor(this._y);
            })
            .bind("NewDirection",
            function (direction) {
                if (direction.x < 0 && direction.y < 0) {
                    if (!this.isPlaying("walk_q"))
                        this.stop().animate("walk_q", 10, -1);
                }
                if (direction.x > 0 && direction.y > 0) {
                    if (!this.isPlaying("walk_s"))
                        this.stop().animate("walk_s", 10, -1);
                }
                if (direction.x < 0 && direction.y > 0) {
                    if (!this.isPlaying("walk_a"))
                        this.stop().animate("walk_a", 10, -1);
                }
                if (direction.x > 0 && direction.y < 0) {
                    if (!this.isPlaying("walk_w"))
                        this.stop().animate("walk_w", 10, -1);
                }
                if (!direction.x && !direction.y) {
                    this.stop();
                }
            })
    }
});