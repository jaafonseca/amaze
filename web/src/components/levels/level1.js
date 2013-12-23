// A Bush is just an Actor with a certain sprite
Crafty.c('Level_1', {
    init: function () {

        this.requires('Actor, TiledMapBuilder')
            .setMapDataSource(FOREST)
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

    }
});