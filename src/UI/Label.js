
import Element from "./Element";

export default class Label extends Phaser.GameObjects.Text{

    constructor(ui, x, y, text, target, callbacks, args, context){
        super(ui.scene, x, y, text, PathBuilder.UI.fonts["Label"]) 
        Element.call(this, ui, x, y);

        this.target = target;
        this.callbacks = callbacks;
        this.callbackcontext = context;
        this.args = args;
        this.tween = null;
    
        this.setInteractive();
    
        return this;
        
    } 
}