/**
 * Created by fonsecaj on 12/21/13.
 */

var vertx = require('vertx');

var server = vertx.createHttpServer().requestHandler(function(req) {
    var file = req.path() === '/' ? 'index.html' : req.path();

    if(req.path().indexOf(".png") > 0) {
        req.response.putHeader("Cache-Control", "max-age=3600");
    }
    req.response.sendFile('web/' + file);

});

server.listen(8080);