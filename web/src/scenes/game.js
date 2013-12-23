// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
    // A 2D array to keep track of all occupied tiles
    this.occupied = new Array(Game.map_grid.width);
    for (var i = 0; i < Game.map_grid.width; i++) {
        this.occupied[i] = new Array(Game.map_grid.height);
        for (var y = 0; y < Game.map_grid.height; y++) {
            this.occupied[i][y] = false;
        }
    }

    // Player character, placed at 5, 5 on our grid
    this.player = Crafty.e('PlayerCharacter').at(5, 5);
    this.occupied[this.player.at().x][this.player.at().y] = true;

    // Place a tree at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 || x == Game.map_grid.width - 1 ||
                y == 0 || y == Game.map_grid.height - 1;

            if (at_edge) {
                // Place a tree entity at the current tile
                Crafty.e('Tree').at(x, y);
                this.occupied[x][y] = true;
            } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
                // Place a bush entity at the current tile
                var bush_or_rock = (Math.random() > 0.3) ? 'Bush' : 'Rock';
                Crafty.e(bush_or_rock).at(x, y);
                this.occupied[x][y] = true;
            }
        }
    }

    // Generate five villages on the map in random locations
    var max_villages = 5;
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            if (Math.random() < 0.03) {
                if (Crafty('Village').length < max_villages && !this.occupied[x][y]) {
                    Crafty.e('Village').at(x, y);
                }
            }
        }
    }

    // Play a ringing sound to indicate the start of the journey
    Crafty.audio.play('ring');

    // Show the victory screen once all villages are visisted
    this.show_victory = this.bind('VillageVisited', function() {
        if (!Crafty('Village').length) {
            Crafty.scene('Victory');
        }
    });
}, function() {
    // Remove our event binding from above so that we don't
    //  end up having multiple redundant event watchers after
    //  multiple restarts of the game
    this.unbind('VillageVisited', this.show_victory);
});