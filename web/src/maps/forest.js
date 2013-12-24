///**
// * Adaptation of http://stackoverflow.com/questions/15981271/implement-maze-generation-algorithm-in-javascript
// *
// * @param x
// * @param y
// * @returns {{x: *, y: *, h: Array, v: Array}}
// */
//
//function maze(x, y) {
//    var n = x * y - 1;
//    if (n < 0) {
//        alert("illegal maze dimensions");
//        return;
//    }
//
//    var horiz = [];
//    for (var j = 0; j < x + 1; j++)
//        horiz[j] = [];
//
//    var verti = [];
//
//    for (var j = 0; j < y + 1; j++)
//        verti[j] = [];
//
//    var here = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
//    var path = [here];
//
//    var unvisited = [];
//    for (var j = 0; j < x + 2; j++) {
//        unvisited[j] = [];
//        for (var k = 0; k < y + 1; k++)
//            unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j != here[0] + 1 || k != here[1] + 1));
//    }
//
//    while (0 < n) {
//
//        var potential = [
//            [here[0] + 1, here[1]],
//            [here[0], here[1] + 1],
//            [here[0] - 1, here[1]],
//            [here[0], here[1] - 1]
//        ];
//
//        var neighbors = [];
//
//        for (var j = 0; j < 4; j++) {
//            if (unvisited[potential[j][0] + 1][potential[j][1] + 1])
//                neighbors.push(potential[j]);
//        }
//
//        if (neighbors.length) {
//            n = n - 1;
//            next = neighbors[Math.floor(Math.random() * neighbors.length)];
//            unvisited[next[0] + 1][next[1] + 1] = false;
//            if (next[0] == here[0])
//                horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
//            else
//                verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
//            path.push(here = next);
//        } else
//            here = path.pop();
//    }
//
//
//    return ({x: x, y: y, h: horiz, v: verti});
//}
//
//var x = 10;
//var y = 10;
//var ey = 5;
//var ex = 4;
//
//var maze = maze(x, y);
//console.log(m);
//
//function buildWalls(m) {
//    var walls = [];
//    for (var j = 0; j < m.x * ex + 1; j++) {
//        for (var k = 0; k < m.y * ey + 1; k++) {
//
//            var xWall = (j % ex == 0);
//            var yWall = (k % ey == 0);
//
//            if (xWall && yWall) { // pillars
//                walls.push(1);
//            } else if (xWall) {
//                var x = j / ex - 1;
//                var y = Math.floor(k / ey);
//                if (j > 0 && j < m.x * ex && m.v[x] && m.v[x][y]) {
//                    walls.push(0);
//                } else {
//                    walls.push(3);
//                }
//            } else if (yWall) {
//                var x = Math.floor((j - 1) / ex);
//                var y = k / ey - 1;
//                if (k > 0 && k < m.y * ey && m.h[x] && m.h[x][y]) {
//                    walls.push(0);
//                } else {
//                    walls.push(6);
//                }
//            } else {
//                walls.push(0);
//            }
//        }
//    }
//
//    return walls;
//}
//
//
//var FOREST = { "height": x * ex + 1,
//    "layers": [
//        {
//            "data": buildWalls(m),
//            "height": x * ex + 1,
//            "name": "Walls",
//            "opacity": 1,
//            "type": "tilelayer",
//            "visible": true,
//            "width": y * ey + 1,
//            "x": 0,
//            "y": 0
//        }
//    ],
//    "orientation": "orthogonal",
//    "properties": {
//
//    },
//    "tileheight": 16,
//    "tilesets": [
//        {
//            "firstgid": 1,
//            "image": "assets/terrain/maze2.png",
//            "imageheight": 320,
//            "imagewidth": 640,
//            "margin": 0,
//            "name": "maze",
//            "properties": {
//
//            },
//            "spacing": 0,
//            "tileheight": 16,
//            "tilewidth": 16
//        }
//    ],
//    "tilewidth": 16,
//    "version": 1,
//    "width": y * ey + 1
//}