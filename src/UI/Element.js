
let Element = (superclass) => class extends superclass{

    constructor(ui, x, y){
        super(ui, x, y);
        console.log(this);
        Object.assign(this.prototype, Element.prototype);
        
        this.ui = ui;
        this.scene = ui.scene;
        this.x = x;
        this.y = y;
        this.ui.elements.push(this);
    
        this.scene.cameras.main.ignore(this);
        var l = 1 << this.scene.cameras.cameras.length - 1;
        this.cameraFilter = l & ~this.ui.camera._id;
    
        return this;
    }

    update(){

    }

    toggle(){
        this.visible = !this.visible;
    }

    click(){
        var callbackcontext = this.callbackcontext;
        var args = this.args;
    
        if (this.callbacks instanceof Array) {
            this.callbacks.forEach(function (callback, index) { callback.apply(callbackcontext[index], args) });
        } else {
            this.callbacks.apply(this.callbackcontext, this.args);
        }
    }

    hover(){

    }

    out(){

    }

}

export default Element;