// Victory scene
// -------------
// Tells the sprite when they've won and lets them start a new game
Crafty.scene('Victory', function() {
    // Display some text in celebration of the victory
    Crafty.e('Actor, Text')
        .text('Great! Press any key to move on to the next level')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() });

    // Give'em a round of applause!
    Crafty.audio.play('applause');

    // After a short delay, watch for the sprite to press a key, then restart
    // the game when a key is pressed
    var delay = true;
    setTimeout(function() { delay = false; }, 5000);
    this.restart_game = Crafty.bind('KeyDown', function() {
        if (!delay) {
            Crafty.scene('Game');
        }
    });
}, function() {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    this.unbind('KeyDown', this.restart_game);
});