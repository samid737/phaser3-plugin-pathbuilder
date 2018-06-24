var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    },

    width: 800,
    height: 600
};

var game = new Phaser.Game(config);

var player;

function preload() 
{

    this.load.image('dude', 'assets/sprites/phaser-dude.png');
    this.load.json('data', 'assets/paths/data.json');

    this.load.scenePlugin('PathBuilder', 'dist/app.js');

}

function create() 
{
    this.cameras.main.setBackgroundColor(0x11155);

    player = this.add.image(400, 300, 'dude').setScale(6, 6);
}

function update()
{
    player.x = Math.sin(this.time.now / 1000) * 200 + 400;
}
