// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function () {

    Crafty.e("Level_1");

    Crafty.e("PlayerCharacter");

    // folow player
    Crafty.viewport.follow(Crafty("Ogre"), 0, 0);
});