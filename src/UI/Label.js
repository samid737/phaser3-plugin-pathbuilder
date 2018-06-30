
import Element from "./Element";
import UI from "./UI";

export default class Label extends Element(Phaser.GameObjects.Text) {

    constructor(ui, x, y, text, target, callbacks, args, context){
        super(ui, x, y, text, UI.fonts["Label"]) 

        this.target = target;
        this.callbacks = callbacks;
        this.callbackcontext = context;
        this.args = args;
        this.tween = null;
    
        this.setInteractive();
    
        return this;
        
    } 
}