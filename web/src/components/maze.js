// A Bush is just an Actor with a certain sprite
Crafty.c('Maze', {
    init: function () {

        this.tileMap = this.getTiledMap(Game.maze.level);

        this.requires('2D, DOM, TiledMapBuilder')
            .setMapDataSource(this.tileMap)
            .createWorld(function (tiledmap) {

                // Walls
                for (var obstacle = 0; obstacle < tiledmap.getEntitiesInLayer('Walls').length; obstacle++) {
                    tiledmap.getEntitiesInLayer('Walls')[obstacle]
                        .addComponent("Collision, Obstacle")
                        .collision();
                }

            });


        return this;
    },

    /**
     * Returns a tiled map
     * @param complexity
     */
    getTiledMap: function (complexity) {
        var ex = Game.maze.gridSize,
            ey = Game.maze.gridSize,
            x = complexity,
            y = complexity;

        var maze = this._maze(x, y);

        var walls = this.buildWalls(maze, ex, ey);

        var floorTile = this.getFloor(0, 0, maze);


        var wallsLayer = {
            "data": walls,
            "height": x * ex + 1,
            "name": "Walls",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": y * ey + 1,
            "x": 0,
            "y": 0
        }, floorsLayer = JSON.parse(JSON.stringify(wallsLayer));

        floorsLayer.name = "Floor";

        for (var i = 0; i < floorsLayer.data.length; i++) {
            if (floorsLayer.data[i] == 0) {
                floorsLayer.data[i] = floorTile;
            } else {
                floorsLayer.data[i] = 0;
            }
        }

        var tiledMap = { "height": x * ex + 1,
            "layers": [floorsLayer,wallsLayer],
            "orientation": "orthogonal",
            "properties": {

            },
            "tileheight": 16,
            "tilesets": [
                {
                    "firstgid": 1,
                    "image": "assets/terrain/maze.png",
                    "imageheight": 32,
                    "imagewidth": 160,
                    "margin": 0,
                    "name": "maze",
                    "properties": {

                    },
                    "spacing": 0,
                    "tileheight": 16,
                    "tilewidth": 16
                }
            ],
            "tilewidth": 16,
            "version": 1,
            "width": y * ey + 1
        }

        return tiledMap;
    },

    buildWalls: function (maze, ex, ey) {
        var walls = [];
        var wall = this.getWall(j, k, maze);
        for (var j = 0; j < maze.x * ex + 1; j++) {
            for (var k = 0; k < maze.y * ey + 1; k++) {

                var xWall = (j % ex == 0);
                var yWall = (k % ey == 0);

                var empty = 0;

                if (xWall && yWall) { // pillars
                    walls.push(wall);
                } else if (xWall) {
                    var x = j / ex - 1;
                    var y = Math.floor(k / ey);
                    if (j > 0 && j < maze.x * ex && maze.v[x] && maze.v[x][y]) {
                        walls.push(empty);
                    } else {
                        walls.push(wall);
                    }
                } else if (yWall) {
                    var x = Math.floor((j - 1) / ex);
                    var y = k / ey - 1;
                    if (k > 0 && k < maze.y * ey && maze.h[x] && maze.h[x][y]) {
                        walls.push(empty);
                    } else {
                        walls.push(wall);
                    }
                } else {
                    walls.push(empty);
                }
            }
        }

        return walls;
    },

    getFloor: function (j, k, maze) {
        return Math.floor(Math.random() * 10 + 1);
    },

    getWall: function (j, k, maze) {
        return Math.floor(Math.random() * 10 + 11);
    },

    /**
     * Maze Algorithm - Adaptation from http://stackoverflow.com/questions/15981271/implement-maze-generation-algorithm-in-javascript
     *
     * @param x
     * @param y
     * @returns {{x: *, y: *, h: Array, v: Array}}
     */
    _maze: function (x, y) {
        var n = x * y - 1;
        if (n < 0) {
            alert("illegal maze dimensions");
            return null;
        }

        var horiz = [];
        for (var j = 0; j < x + 1; j++)
            horiz[j] = [];

        var verti = [];

        for (var j = 0; j < y + 1; j++)
            verti[j] = [];

        var here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
        var path = [here];

        var unvisited = [];
        for (var j = 0; j < x + 2; j++) {
            unvisited[j] = [];
            for (var k = 0; k < y + 1; k++)
                unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
        }

        while (0 < n) {

            var potential = [
                [here[0] + 1, here[1]],
                [here[0], here[1] + 1],
                [here[0] - 1, here[1]],
                [here[0], here[1] - 1]
            ];

            var neighbors = [];

            for (var j = 0; j < 4; j++) {
                if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
                    neighbors.push(potential[j]);
            }

            if (neighbors.length) {
                n = n - 1;
                next = neighbors[Math.floor(Math.random() * neighbors.length)];
                unvisited[next[0] + 1][next[1] + 1] = false;
                if (next[0] == here[0])
                    horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
                else
                    verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
                path.push(here = next);
            } else
                here = path.pop();
        }


        return ({x: x, y: y, h: horiz, v: verti});
    }
});