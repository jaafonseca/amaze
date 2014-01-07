Game = {

    view: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    maze: {
        level: 4,
        gridSize: 4,
        displayLevel: 1,
        score: 0,
        food: 10,
        tileMap: {},
        speed: 2
    },

    // level up
    levelUp: function () {
        Game.maze.food = 10;
        Game.maze.level++;
        Game.maze.displayLevel++;
        document.getElementById("level").innerHTML = "Level: " + Game.maze.displayLevel;
        Crafty.scene('Victory');
    },

    // score up
    scoreUp: function (data) {
        Game.maze.score += data.score;
        Game.maze.food += data.food;
        document.getElementById("score").innerHTML = "Score: " + Game.maze.score;
    },

    // start the game
    start: function () {
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.viewport.clampToEntities = false;
        Crafty.background('rgb(0, 0, 0)');
        Crafty.scene('Loading');

        Crafty.bind('GoalReached', Game.levelUp);
        Crafty.bind('ScoreUp', Game.scoreUp);

        Game.startFoodCounter();
    },

    startFoodCounter: function() {
        document.getElementById("food").innerHTML = "Energy: " + Game.maze.food;

        if (Game.maze.food <= 0) {
            // game over
            Crafty.scene('GameOver');
        } else {
            Game.maze.food--;
            Game.foodCounter = setTimeout(Game.startFoodCounter, 1000);
        }
    },

    stopFoodCounter: function() {
        clearTimeout(Game.foodCounter);

        Game.foodCounter = null;
    }
}