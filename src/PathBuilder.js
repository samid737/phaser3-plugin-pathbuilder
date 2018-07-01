
import Scene from "./Scene";

export class PathBuilder extends Phaser.Plugins.BasePlugin
{

    constructor(pluginManager)
    {
        super(pluginManager);
        console.log(this);
        this.game.scene.add('UI',Scene, true);

    }
    
}

