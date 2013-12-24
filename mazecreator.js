var vertx = require('vertx');
var console = require('vertx/console');

/**
 * Maze Algorithm - Adaptation from http://stackoverflow.com/questions/15981271/implement-maze-generation-algorithm-in-javascript
 *
 * @param x
 * @param y
 * @returns {{x: *, y: *, h: Array, v: Array}}
 */
function createMaze(x, y) {
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

var maxLevel = 50;
var mazesPerLevel = 10;
var mazes = {};

for (var l = 4; l < maxLevel; l++) {
    for (var k = 0; k < mazesPerLevel; k++) {
        if (!mazes[l]) mazes[l] = [];
        mazes[l].push(createMaze(l, l));
        console.log("Created maze: " + l + "x" + l);
    }
}


vertx.fileSystem.writeFile("mazes.json", JSON.stringify(mazes), function () {
    console.log("Wrote to file");
});