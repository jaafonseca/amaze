// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function () {


    var map = Crafty.e("Maze");

    Game.maze.tileMap = map.tileMap;

    document.getElementById("level").innerHTML = "Level " + Game.maze.displayLevel;

    var player = Crafty.e("PlayerCharacter").at(Math.floor((Game.maze.level - 2) / 2), Math.floor((Game.maze.level - 2) / 2));

    Crafty.e("Goal").at(Game.maze.level - 1, Game.maze.level - 1);

    // follow player
    Crafty.viewport.follow(player, 0, 0);

    // level up
    this.levelUp = this.bind('GoalReached', function () {
        Crafty.scene('Victory');
    });

    // score up
    this.scoreUp = this.bind('ScoreUp', function (data) {
        Game.maze.score += data;
        document.getElementById("score").innerHTML = "Score " + Game.maze.score;
    });

    this.createItems = function () {
        var items = [];

        items.push({name: "Carrot", icon: "icon_ring", score: 15, p: 0.01});
        items.push({name: "Carrot", icon: "icon_sword", score: 10, p: 0.02});
        items.push({name: "Spice", icon: "icon_spice", score: 5, p: 0.05});
        items.push({name: "Lemon", icon: "icon_lemon", score: 3, p: 0.05});
        items.push({name: "Corn", icon: "icon_corn", score: 2, p: 0.1});
        items.push({name: "Carrot", icon: "icon_carrot", score: 1, p: 0.2});

        for (var i = 0; i < Game.maze.level - 1; i++) {
            for (var j = 0; j < Game.maze.level - 1; j++) {
                var created = false, counter = 0;
                while (!created && counter++ < items.length) {
                    var item = items[counter - 1];
                    if (Math.random() < item.p) {
                        Crafty.e("Item, " + item.icon).at(i, j).score(item.score);
                        created = true;
                    }
                }

            }
        }
    }

    this.createItems();


}, function () {
    this.unbind('GoalReached', this.levelUp);
    this.unbind('ScoreUp', this.scoreUp);
});