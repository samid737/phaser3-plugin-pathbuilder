
import Scene from "./Scene";
import UI from "./UI/UI";
import Pointer from "./UI/Pointer";

export class PathBuilder extends Phaser.Plugins.BasePlugin
{

    constructor(pluginManager)
    {
        super(pluginManager);

        pluginManager.registerGameObject('ui', this.addUI);
        pluginManager.registerGameObject('superpointer', this.addPointer);

        this.game.scene.add('UI',Scene, true);
    }

    addUI(scene){
        return new UI(scene);
    }

    addPointer(ui, x, y, key){
        return new Pointer(ui, x, y, key);
    }
}

