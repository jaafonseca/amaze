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
        'assets/sprite/player.png',
        'assets/16x16_forest_2.gif',
        'assets/hunter.png'
    ], function () {

        Crafty.sprite(35,40,"assets/sprite/player.png", {
            Ogre:[0,0]
        });

        Crafty.sprite(16, 'assets/16x16_forest_2.gif', {
            spr_tree:    [0, 0],
            spr_bush:    [1, 0],
            spr_village: [0, 1],
            spr_rock:    [1, 1]
        });

        Crafty.sprite(16, 'assets/hunter.png', {
            spr_player:  [0, 2]
        }, 0, 2);

        // everything is loaded... GO!
        Crafty.scene('Game');
    })
});