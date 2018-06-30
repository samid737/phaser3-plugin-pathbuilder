
import Element from "../Element";
import UI from "../UI";

export default class Point extends Element(Phaser.GameObjects.Image){

    constructor(ui, x, y, curve,  key, mapping){
        super(ui, x, y, key);

        var vector = new Phaser.Math.Vector2(x, y);

        this.setInteractive();
        this.scene.input.setDraggable(this);
    
        this.setData('vector', vector);
        this.scene.vectors.push(vector);
    
        //TODO: abstract from point to A custom curve class.
        if(curve !==null){
            this.curve = curve;
            this.curve.controlpoints.push(this);
        }
    
        if (mapping) {
            this.mapping = mapping;
        }
    
        this.on('pointerout', function (pointer, gameObject) {
            this.scene.pointer.switchCursor();                      
            
            this.scene.pointer.lbl.visible = true;
        });
    
        this.on('drag', function (pointer, gameObject) {
            game.canvas.style.cursor = "pointer";                        
            
            this.x = this.scene.pointer.x + this.scene.drawpanel.camera.scrollX;
            this.y = this.scene.pointer.y + this.scene.drawpanel.camera.scrollY;
    
            this.scene.pointer.lbl.visible = false;
    
            this.data.get('vector').set(this.x, this.y);
    
            if (this.mapping) {
                var m = this.mapping;
                var _this = this;
    
                for (var t in m.data) {
                    m.src[m.data[t].property] = m.data[t].operator(m.src, _this[t]);
                }
            }
    
            this.scene.graphics.clear();
            this.scene.draw();
    
        });
    
        this.lbl = this.ui.add.label(this.x + 10, this.y + 10, "").setFontStyle(UI.fonts["Point"]);
    
        return this;
    }

    update() {
        this.lbl.x = this.x + 10;
        this.lbl.y = this.y + 10;
        this.lbl.setText("x: " + this.x + " y: " + this.y);
    }

    destroy(){
        //this.scene.drawpanel.elements.pop();
        this.lbl.destroy();
        super.destroy();    
    }
}