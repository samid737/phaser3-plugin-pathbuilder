
let Element = (superclass) => class extends superclass{

    constructor(ui,x,y,...args){
        super(ui.scene, x, y, ...args);
        
        this.ui = ui;
        this.x = x;
        this.y = y;
        this.scene  = this.ui.scene;

        this.ui.elements.push(this);
    
        let l = (1 << this.scene.cameras.cameras.length) - 1;
        this.cameraFilter = l & ~this.ui.camera.id;
    
        return this;
    }

    update(){

    }

    toggle(){
        this.visible = !this.visible;
    }

    click(){
        let callbackcontext = this.callbackcontext;
        let args = this.args;
        
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