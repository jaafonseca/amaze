Game = {

    view: {
        width: window.innerWidth,
        height: window.innerHeight
    },

    start: function () {
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.viewport.clampToEntities = false;
        Crafty.background('rgb(0, 0, 0)');
        Crafty.scene('Loading');
    }
}

$text_css = {
    'font-size': '24px',
    'font-family': 'Arial',
    'color': 'white',
    'text-align': 'center'
}