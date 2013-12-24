// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function () {

    var level = 1;

    var map = Crafty.e("Maze").createMaze(level);

    var player = Crafty.e("PlayerCharacter").attr(
        {
            x: map.tileMap.tilewidth * 2,
            y: map.tileMap.tileheight
        });


    // folow player
    Crafty.viewport.follow(player, 0, 0);
});