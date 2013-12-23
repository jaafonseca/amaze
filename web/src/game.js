Game = {

    view: {
        width: 320,
        height: 256
    },

    start: function () {
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.viewport.clampToEntities = false;
        Crafty.background('rgb(87, 109, 20)');
        Crafty.scene('Loading');
    }
}

$text_css = {
    'font-size': '24px',
    'font-family': 'Arial',
    'color': 'white',
    'text-align': 'center'
}