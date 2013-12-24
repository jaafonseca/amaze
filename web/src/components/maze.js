// A Bush is just an Actor with a certain sprite
Crafty.c('Maze', {
    createMaze: function (level) {

        this.tileMap = this.getTiledMap(level + 4);

        this.requires('Actor, TiledMapBuilder')
            .setMapDataSource(this.tileMap)
            .createWorld(function (tiledmap) {

//                //Roots
//                for (var obstacle = 0; obstacle < tiledmap.getEntitiesInLayer('root').length; obstacle++) {
//                    tiledmap.getEntitiesInLayer('root')[obstacle]
//                        .addComponent("Collision, Obstacle")
//                        .collision(new Crafty.polygon([10, 5], [30, 5], [30, 15], [10, 15]));
//                }
//
                //Water
                for (var obstacle = 0; obstacle < tiledmap.getEntitiesInLayer('Walls').length; obstacle++) {
                    tiledmap.getEntitiesInLayer('Walls')[obstacle]
                        .addComponent("Collision, Obstacle")
                        .collision();
                }
//
//                //Rocks
//                for (var obstacle = 0; obstacle < tiledmap.getEntitiesInLayer('Rocks').length; obstacle++) {
//                    tiledmap.getEntitiesInLayer('Rocks')[obstacle]
//                        .addComponent("Collision, Obstacle")
//                        .collision();
//                }
//
//                //Set z-index for correct view: front, back
//                for (var obstacle = 0; obstacle < tiledmap.getEntitiesInLayer('treeTop').length; obstacle++) {
//                    tiledmap.getEntitiesInLayer('treeTop')[obstacle]
//                        .z = Math.floor(tiledmap.getEntitiesInLayer('treeTop')[obstacle]._y + tiledmap.getEntitiesInLayer('treeTop')[obstacle]._h);
//                }

            });



        //Brigge
//        Crafty.e("2D, DOM, Bridge, Collision").attr({x: 0, y: 0, w: Game.view.width, h: Game.view.height})
//            .collision(new Crafty.polygon([348, 186], [510, 104], [348, 186]));
//
//        Crafty.e("2D, DOM, Bridge, Collision").attr({x: 0, y: 0, w: Game.view.width, h: Game.view.height})
//            .collision(new Crafty.polygon([331, 209], [349, 185], [331, 209]))

//        Crafty("TiledMapBuilder")
//            .getEntitiesInLayer('lead')[0]
//            .addComponent("Collision, Obstacle")
//            .collision(new Crafty.polygon([0, 0], [30, 0], [0, 10]));
//
//        Crafty("TiledMapBuilder")
//            .getEntitiesInLayer('lead')[1]
//            .addComponent("Collision, Obstacle")
//            .collision(new Crafty.polygon([0, -10], [20, 0], [0, 10], [-20, 0]));

        return this;
    },

    /**
     * Returns a tiled map
     * @param complexity
     */
    getTiledMap: function (complexity) {
        var ex = 5,
            ey = 5,
            x = complexity,
            y = complexity,
            maze = this._maze(x, y),
            walls = this.buildWalls(maze, ex, ey),
            tiledMap = { "height": x * ex + 1,
                "layers": [
                    {
                        "data": walls,
                        "height": x * ex + 1,
                        "name": "Walls",
                        "opacity": 1,
                        "type": "tilelayer",
                        "visible": true,
                        "width": y * ey + 1,
                        "x": 0,
                        "y": 0
                    }
                ],
                "orientation": "orthogonal",
                "properties": {

                },
                "tileheight": 16,
                "tilesets": [
                    {
                        "firstgid": 1,
                        "image": "assets/terrain/maze2.png",
                        "imageheight": 320,
                        "imagewidth": 640,
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
        for (var j = 0; j < maze.x * ex + 1; j++) {
            for (var k = 0; k < maze.y * ey + 1; k++) {

                var xWall = (j % ex == 0);
                var yWall = (k % ey == 0);

                var wall = 3;
                var empty = 0;

                if (j == 0 || k == 0 || j == maze.x * ex || k == maze.y * ey) {
                    wall = 1;
                }

                if (j == maze.x * ex - 1 && k == maze.y * ey) {
                    walls.push(wall)
                } else if (xWall && yWall) { // pillars
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
            return;
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