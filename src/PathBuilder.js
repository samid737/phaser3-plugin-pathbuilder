
var PathBuilder = function (scene) {

    this.scene = scene;
    this.systems = scene.sys;

    if (!scene.sys.settings.isBooted) {
        scene.sys.events.on('boot', this.boot, this);
    }
};

PathBuilder.UI = require("./UI/UI");
PathBuilder.Scene = require("./Scene");

PathBuilder.register = function (PluginManager) {

    PluginManager.register('PathBuilder', PathBuilder, 'curveGenerator');
};

PathBuilder.prototype = {

    boot: function () {
        var eventEmitter = this.systems.events;

        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);

        //TODO: rewrite game variable
        this.scene.sys.game.scene.add('UI', PathBuilder.Scene, true);

    },

    //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
    shutdown: function () {
    },

    //  Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.
    destroy: function () {
        this.shutdown();

        this.scene = undefined;
    }

};

PathBuilder.prototype.constructor = PathBuilder;

module.exports = PathBuilder;


