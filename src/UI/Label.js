
var Element = require("./Element");

var Label = function (ui, x, y, text, target, callbacks, args, context) {
    Element.call(this, ui, x, y);
    Phaser.GameObjects.Text.call(this, ui.scene, x, y, text, PathBuilder.UI.fonts["Label"]);

    this.target = target;
    this.callbacks = callbacks;
    this.callbackcontext = context;
    this.args = args;
    this.tween = null;

    this.setInteractive();

    return this;
}

Label.prototype = Object.create(Phaser.GameObjects.Text.prototype);
Object.assign(Label.prototype, Element.prototype);

module.exports = Label;
