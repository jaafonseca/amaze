// Victory scene
// -------------
Crafty.scene('Victory', function () {
    // Display some text in celebration of the victory
    var message = Crafty.e('Actor, Text')
        .attr({w: Game.view.width});


    var countDown = 3;

    var timer = function () {
        message.text("Level up in " + countDown);

        if (countDown == 0) {
            Game.maze.level++;
            Game.maze.displayLevel++;
            Crafty.scene('Game')
        }

        countDown--;

        setTimeout(timer, 1000);
    }

    timer();

    Crafty.viewport.follow(message, 0, 0);

});