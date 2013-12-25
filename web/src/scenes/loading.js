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
            icon_carrot: [0, 0],
            icon_corn: [1, 0],
            icon_spice: [2, 0],
            icon_lemon: [4, 1],
            icon_sword: [4, 2],
            icon_ring: [7, 3],
            icon_scroll: [8, 5]
        });

        Crafty.sprite(16, 'assets/sprite/hunter.png', {
            spr_player: [0, 2]
        }, 0, 2);

        // everything is loaded... GO!
        Crafty.scene('Game');
    })
});