/**
 * Takes care of loading the assets
 */

Crafty.scene('Loading', function () {

    // setup a loading text
    Crafty.e('Actor, Text')
        .text('Loading; please wait...')
        .attr({ x: 0, y: Game.view.height / 2 - 24, w: Game.view.width });

    // Load our sprite map image
    Crafty.load([
        'assets/terrain/forest.png',
        'assets/sprite/player.png'
    ], function () {

        Crafty.sprite(35,40,"assets/sprite/player.png", {
            Ogre:[0,0]
        });

        // everything is loaded... GO!
        Crafty.scene('Game');
    })
});