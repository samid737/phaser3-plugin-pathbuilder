
import Scene from "./Scene";

export class PathBuilder extends Phaser.Plugins.BasePlugin
{

    constructor(pluginManager)
    {
        super(pluginManager);
        console.log(this);
        game.scene.add('UI',Scene, true);

    }

    boot()
    {
        //var eventEmitter = this.systems.events;

        //eventEmitter.on('shutdown', this.shutdown, this);
        //eventEmitter.on('destroy', this.destroy, this);
        //console.log(this.systems);
        //
        //TODO: rewrite according API
       // this.systems.scenePlugin.add('UI', Scene, true);

    }

    // //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
    // shutdown()
    // {
    // }

    //  Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.
    destroy()
    {
        this.shutdown();

        this.scene = undefined;
    }

}

