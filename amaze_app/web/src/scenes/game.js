// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function () {


    var map = Crafty.e("Maze");

    Game.maze.tileMap = map.tileMap;

    var player = Crafty.e("PlayerCharacter").at(Math.floor((Game.maze.level - 2) / 2), Math.floor((Game.maze.level - 2) / 2));

    Crafty.e("Goal").at(Game.maze.level - 1, Game.maze.level - 1);

    // follow player
    Crafty.viewport.follow(player, 0, 0);

    this.createItems = function () {
        var items = [];

        items.push({entity: "Item, Ring", score: 15, food: 0, p: 0.005});
        items.push({entity: "Item, Sword", score: 10, food: 0, p: 0.01});
        items.push({entity: "Item, Spice", score: 5, food: 0, p: 0.02});
        items.push({entity: "Item, Lemon", score: 3, food: 3, p: 0.02});
        items.push({entity: "Item, Corn", score: 2, food: 5, p: 0.05});
        items.push({entity: "Item, Carrot", score: 1, food: 5, p: 0.1});

        for (var i = 0; i < Game.maze.level - 1; i++) {
            for (var j = 0; j < Game.maze.level - 1; j++) {
                var created = false, counter = 0;
                while (!created && counter++ < items.length) {
                    var item = items[counter - 1];
                    if (Math.random() < item.p) {
                        Crafty.e(item.entity)
                            .at(i, j)
                            .score(item.score)
                            .food(item.food);
                        created = true;
                    }
                }

            }
        }
    }

    this.createItems();


});