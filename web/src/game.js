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
        tileMap: {},
        speed: 2
    },

    // level up
    levelUp: function () {
        Game.maze.level++;
        Game.maze.displayLevel++;
        document.getElementById("level").innerHTML = "Level: " + Game.maze.displayLevel;
        Crafty.scene('Victory');
    },

    // score up
    scoreUp: function (data) {
        Game.maze.score += data;
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
    }
}