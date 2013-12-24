// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function () {


    var map = Crafty.e("Maze");

    Game.maze.tileMap = map.tileMap;

    var player = Crafty.e("PlayerCharacter").at(Math.floor((Game.maze.level - 1) / 2), Math.floor((Game.maze.level - 1) / 2));

    Crafty.e("Goal").at(Game.maze.level - 1, Game.maze.level - 1);

    // folow player
    Crafty.viewport.follow(player, 0, 0);

    // level up
    this.levelUp = this.bind('GoalReached', function() {
        Crafty.scene('Victory');
    });



}, function () {
    this.unbind('GoalReached', this.levelUp);
});