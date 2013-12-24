// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function () {

    var level = Crafty.e("Level").create(6);

    console.log(level);
    var player = Crafty.e("PlayerCharacter").attr({x:100,y:100});


    // folow player
    Crafty.viewport.follow(player, 0, 0);
});