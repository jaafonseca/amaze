// Victory scene
// -------------
Crafty.scene('GameOver', function () {

    var message = Crafty.e('Actor, Text')
        .text("Game over")
        .attr({w: Game.view.width});

    Crafty.viewport.follow(message, 0, 0);

});