Crafty.c('Actor', {

    init: function () {
        this.requires('2D, DOM');
    },

    at: function (x, y) {

        var fx = x * Game.maze.tileMap.tilewidth * Game.maze.gridSize + (Game.maze.tileMap.tilewidth * Game.maze.gridSize) / 2,
            fy = y * Game.maze.tileMap.tileheight * Game.maze.gridSize + (Game.maze.tileMap.tileheight * Game.maze.gridSize) / 2;

        this.attr({ x: fx, y: fy });
        return this;
    }
});