
import Element from "./Element";
import UI from "./UI";

export default class Button extends Element(Phaser.GameObjects.Text){

    constructor(ui, x, y, text, key, frame, target, callbacks, args, context){
        super(ui, x, y, text, UI.fonts["Button"]);

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
        super.click();
        this.tween = this.scene.tweens.add({ targets: this, scaleX: 1.2, scaleY: 1.2, duration: 100, ease: 'Linear', yoyo: true });
    }

    hover() {
        this.scene.gameCanvas.style.cursor = "pointer";
        this.setScale(1.1, 1.1);
        super.hover();
    }
    
    out() {
        this.scene.pointer.switchCursor();                       
        this.setScale(1, 1);
        super.out();
    }

}
