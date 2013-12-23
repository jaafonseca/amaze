/**
 * Created by fonsecaj on 12/21/13.
 */

var vertx = require('vertx');

var server = vertx.createHttpServer().requestHandler(function(req) {
    var file = req.path() === '/' ? 'index.html' : req.path();
    req.response.sendFile('web/' + file);

});

server.listen(8080);