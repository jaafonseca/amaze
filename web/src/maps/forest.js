/**
 * Adaptation of http://stackoverflow.com/questions/15981271/implement-maze-generation-algorithm-in-javascript
 *
 * @param x
 * @param y
 * @returns {{x: *, y: *, h: Array, v: Array}}
 */

function maze(x, y) {
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

var x = 4;
var y = 4;

var m = maze(x, y);
console.log(m);

function display(m) {
    var text = [];
    for (var j = 0; j < m.x * 2 + 1; j++) {
        var line = [];
        if (0 == j % 2)
            for (var k = 0; k < m.y * 2 + 1; k++)
                if (0 == k % 2)
                    line[k] = 1;
                else if (j > 0 && m.v[j / 2 - 1][Math.floor(k / 2)])
                    line[k] = 0;
                else
                    line[k] = 1;
        else
            for (var k = 0; k < m.y * 2 + 1; k++)
                if (0 == k % 2)
                    if (k > 0 && m.h[(j - 1) / 2][k / 2 - 1])
                        line[k] = 0;
                    else
                        line[k] = 1;
                else
                    line[k] = 0;

        if (0 == j) line[1] = 0; // entry
        if (m.x * 2 - 1 == j) line[2 * m.y] = 0; // exit
        text = text.concat(line);
    }
    return text;
}


var FOREST = { "height": x * 2 + 1,
    "layers": [
        {
            "data": display(m),
            "height": x * 2 + 1,
            "name": "Walls",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": y * 2 + 1,
            "x": 0,
            "y": 0
        }
    ],
    "orientation": "orthogonal",
    "properties": {

    },
    "tileheight": 32,
    "tilesets": [
        {
            "firstgid": 1,
            "image": "assets/terrain/maze.png",
            "imageheight": 320,
            "imagewidth": 640,
            "margin": 0,
            "name": "maze",
            "properties": {

            },
            "spacing": 0,
            "tileheight": 32,
            "tilewidth": 32
        }
    ],
    "tilewidth": 32,
    "version": 1,
    "width": y * 2 + 1
}