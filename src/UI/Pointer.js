
import Element from "./Element";

export default class Pointer extends Phaser.GameObjects.Image(Element){

    constructor(ui, x, y, key, frame){
        Element.call(this, ui, x, y);
        super(ui.scene, x, y, key);

        this.alpha = 0.5;

        this.snap = 50;
    
        //global input listener 
    
        this.scene.input.on('pointerdown', function (pointer, gameObject) {
    
            if (this.scene.mode == "draw" && pointer.dragState ==0 && pointer.leftButtonDown()) {
                if (gameObject.length ==0 && (pointer.x > 50 && pointer.x < this.scene.W - 100)) {
                    
                    var _dx = this.scene.drawpanel.camera.scrollX;
                    var _dy = this.scene.drawpanel.camera.scrollY;
                    
                    this.scene.place(this.scene.drawpanel, this.x + _dx, this.y +_dy);
                }
            } 
    
    
            if(pointer.rightButtonDown() && pointer.dragState == 0)
            {
                this.lockX = pointer.x;
                this.lockY = pointer.y;
                
                this.scene.switchmode("select");     
            } 
    
    
            if(pointer.middleButtonDown())
            {
                this.lastX = pointer.x + this.scene.drawpanel.camera.scrollX;
                this.lastY = pointer.y + this.scene.drawpanel.camera.scrollY;
                
                this.scene.switchmode("hand");
            }  
    
        }, this);
    
        this.scene.input.on('pointerup', function (pointer, gameObject) {
            if(pointer.middleButtonDown())
            {
                this.scene.switchmode("normal");
            }          
        }, this);
        
        this.snapkey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
        this.lbl = this.ui.add.label(x + 20, y + 20, "").setFontStyle(PathBuilder.UI.fonts["Label"]);
        
        this.menu = this.ui.add.menu(x, y);
    
        this.menu.add(-50, -50, "Line", this.switchdrawmode,["Line"],this);
        this.menu.add(0, -50, "Quadratic", this.switchdrawmode,["Quadratic"],this);
        this.menu.add(50, -50, "Cubic", this.switchdrawmode,["Cubic"],this);
        this.menu.add(-50, 50, "Spline", this.switchdrawmode,["Spline"],this);
        this.menu.add(0, 50, "Ellipse", this.switchdrawmode,["Ellipse"],this);
    
        this.scene.events.on('switchmode', this.switchmode, this);
    
        this.scene.add.existing(this);

    }

    switchmode(mode) {

        if (mode == "draw") {
            // TODO: abstraction
            
            this.setVisible(true);
            this.lbl.setVisible(true);
            this.menu.hide();
    
        }
        if (mode == "normal") {        
            
            this.setVisible(false);
            this.menu.hide();        
    
        }
        if (mode == "select"){        
            this.setVisible(false);  
    
            this.menu.setPosition(this.x , this.y);
            this.menu.show();        
    
        }
        if(mode == "hand"){
            game.canvas.style.cursor = "grab";
            
            this.setVisible(true);
            this.lbl.setVisible(true);
    
        }
    }

    switchCursor(){
        game.canvas.style.cursor = this.scene.cursors[this.scene.mode];
    }

    switchdrawmode(mode) {
        this.scene.drawmode = mode;
        this.scene.drawmodelabel.setText("curve: " + mode);
        this.menu.hide();            
        this.scene.switchmode("draw");
    }
    update() {
    
        this.x = this.scene.input.activePointer.x;
        this.y = this.scene.input.activePointer.y;
        
        if(this.scene.mode == "hand"){
            this.scene.look(this.scene.drawpanel.camera);
            this.scene.look(this.scene.supercamera);            
        }  

        if(this.scene.mode == "select"){
            if(Phaser.Math.Distance.Between(this.x, this.y, this.lockX, this.lockY)>150){
                this.scene.switchmode("draw");
            } 
        }    
    
        if(this.scene.mode !== "select"){
        
            if (this.snapkey.isDown) {
                this.x = Math.round(this.x / this.snap) * this.snap;
                this.y = Math.round(this.y / this.snap) * this.snap;
            }
            this.lbl.setPosition(this.x + 20, this.y + 20);
            this.lbl.setText("x: " + this.x + " y: " + this.y);
        }
    }
}