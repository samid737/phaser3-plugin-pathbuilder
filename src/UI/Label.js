
import Element from "./Element";

export default class Label extends Phaser.GameObjects.Text(Element){

    constructor(ui, x, y, text, target, callbacks, args, context){
        Element.call(this, ui, x, y);
        super(ui.scene, x, y, text, PathBuilder.UI.fonts["Label"]) 

        this.target = target;
        this.callbacks = callbacks;
        this.callbackcontext = context;
        this.args = args;
        this.tween = null;
    
        this.setInteractive();
    
        return this;
        
    } 
}