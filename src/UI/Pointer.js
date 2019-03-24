
import Element from "./Element";
import UI from "./UI";

export default class Pointer extends Element(Phaser.GameObjects.Image){

    constructor(ui, x, y, key, frame){
        super(ui, x, y, key);

        this.alpha = 0.5;

        this.delta = 1;
    
        //global input listener 
     
        this.scene.input.on('pointerdown', function (pointer, gameObject) {
     
            if (this.scene.mode == "draw" && this.scene.input.getDragState(pointer) == 0 && pointer.leftButtonDown()) {
                if (gameObject.length ==0 && (pointer.x > 50 && pointer.x < this.scene.W - 100)) {
                     
                    let _dx = this.scene.drawpanel.camera.scrollX;
                    let _dy = this.scene.drawpanel.camera.scrollY;
                    
                    this.scene.place(this.scene.drawpanel, this.x + _dx, this.y +_dy);
                } 
            } 
    
    
            if(pointer.rightButtonDown() && this.scene.input.getDragState(pointer) == 0)
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
            
            if(this.scene.mode == "hand")
            {
                this.scene.switchmode("normal");
            }          
        }, this);
        
        this.snapkey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
        this.lbl = this.ui.add.label(x + 20, y + 20, "").setFontStyle(UI.fonts["Label"]);
        
        this.menu = this.ui.add.menu(x, y);
    
        this.menu.add(-50, -50, "Line", this.switchdrawmode,["Line"],this);
        this.menu.add(0, -50, "Quadratic", this.switchdrawmode,["QuadraticBezier"],this);
        this.menu.add(50, -50, "Cubic", this.switchdrawmode,["CubicBezier"],this);
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
            this.scene.gameCanvas.style.cursor = "grab";
            
            this.setVisible(true);
            this.lbl.setVisible(true);
    
        }
    }

    switchCursor(){
        this.scene.gameCanvas.style.cursor = this.scene.cursors[this.scene.mode];
    }

    switchdrawmode(mode) {
        this.scene.drawmode = mode;
        this.scene.drawmodelabel.setText("curve: " + mode);
        this.menu.hide();            
        this.scene.switchmode("draw");
    }
    snap(){
        this.delta = this.delta == 1 ? 50: 1;
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
        
            this.x = Math.round(this.x / this.delta) * this.delta;
            this.y = Math.round(this.y / this.delta) * this.delta;

            this.lbl.setPosition(this.x + 20, this.y + 20);
            this.lbl.setText("x: " + this.x + " y: " + this.y);
        }
    }
}