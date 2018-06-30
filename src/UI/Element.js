
let Element = (superclass) => class extends superclass{

    constructor(ui,x,y,...args){
        super(ui.scene, x, y, ...args);
        console.log(this);
        
        this.ui = ui;
        this.x = x;
        this.y = y;
        this.scene  = this.ui.scene;

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
        
        console.log()
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