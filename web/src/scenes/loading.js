/**
 * Takes care of loading the assets
 */

Crafty.scene('Loading', function () {

    // setup a loading text
    Crafty.e('Actor, Text')
        .text('Starting game')
        .attr({ x: 0, y: Game.view.height / 2 - 24, w: Game.view.width });

    // Load our sprite map image
    Crafty.load([
        'assets/sprite/icons.gif',
        'assets/sprite/hunter.png'
    ], function () {


        Crafty.sprite(16, 'assets/sprite/icons.gif', {
            Carrot: [0, 0],
            Corn: [1, 0],
            Spice: [2, 0],
            Lemon: [4, 1],
            Sword: [4, 2],
            Ring: [7, 3],
            Scroll: [8, 5]
        });

        Crafty.sprite(16, 'assets/sprite/hunter.png', {
            spr_player: [0, 2]
        }, 0, 2);

        // everything is loaded... GO!
        Crafty.scene('Game');
    })
});