
var Element = require("./Element");

var Button = function (ui, x, y, text, key, frame, target, callbacks, args, context) {
    Element.call(this, ui, x, y);
    Phaser.GameObjects.Text.call(this, ui.scene, x, y, text, PathBuilder.UI.fonts["Button"]);

    this.target = target;
    this.callbacks = callbacks;
    this.args = args;
    this.callbackcontext = context;
    this.tween = null;

    this.setInteractive();

    this.on('pointerdown', function (pointer, gameObject) {
        this.click();
    });
    this.on('pointerover', function (pointer, gameObject) {
        this.hover();
    });
    this.on('pointerout', function (pointer, gameObject) {
        this.out();
    });

    return this;
}

Button.prototype = Object.create(Phaser.GameObjects.Text.prototype);
Object.assign(Button.prototype, Element.prototype);

Button.prototype.click = function () {
    Element.prototype.click.call(this);
    this.tween = this.scene.tweens.add({ targets: this, scaleX: 1.2, scaleY: 1.2, duration: 100, ease: 'Linear', yoyo: true });
}

Button.prototype.hover = function () {
    Element.prototype.hover.call(this);
    this.setScale(1.1, 1.1);
}

Button.prototype.out = function () {
    Element.prototype.out.call(this);
    this.setScale(1, 1);
}

module.exports = Button;
