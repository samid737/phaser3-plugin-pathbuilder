
import Element from "./Element";

export default class Button extends Phaser.GameObjects.Text(Element) {

    constructor(ui, x, y, text, key, frame, target, callbacks, args, context){
        Element.call(this,ui, x, y);
        super(ui.scene, x, y, text, PathBuilder.UI.fonts["Button"]);

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

    click() {
        Element.prototype.click.call(this);
        this.tween = this.scene.tweens.add({ targets: this, scaleX: 1.2, scaleY: 1.2, duration: 100, ease: 'Linear', yoyo: true });
    }

    hover() {
        game.canvas.style.cursor = "pointer";
        Element.prototype.hover.call(this);
        this.setScale(1.1, 1.1);
    }

    
    out() {
        this.scene.pointer.switchCursor();                       
        Element.prototype.out.call(this);
        this.setScale(1, 1);
    }

}
