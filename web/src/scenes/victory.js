// Victory scene
// -------------
Crafty.scene('Victory', function () {
    // Display some text in celebration of the victory
    Crafty.e('Actor, Text')
        .text('Great! Press any key to move on to the next level')
        .attr({ x: 0, y: 100 });
//
//    // Give'em a round of applause!
//    Crafty.audio.play('applause');

    this.levelUp = Crafty.bind('KeyDown', function () {
        Game.maze.level++;
        Game.maze.displayLevel++;
        Crafty.scene('Game');
    });
}, function () {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    this.unbind('KeyDown', this.levelUp);
});