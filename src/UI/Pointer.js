
var Element = require("./Element");

var Pointer = function (ui, x, y, key, frame) {
    Element.call(this, ui, x, y);
    Phaser.GameObjects.Image.call(this, ui.scene, x, y, key);

    this.alpha = 0.5;

    this.snap = 50;
    
    //global input listener 
    this.scene.input.on('pointerdown', function (pointer, gameObject) {

        if (this.scene.mode == "draw" && pointer.dragState ==0) {
            if (gameObject.length ==0 && (pointer.x > 50 && pointer.x < 700)) {
                this.scene.place(this.scene.drawpanel, this.x, this.y);
            }
        } 

    }, this);

    this.snapkey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.lbl = this.ui.add.label(x + 20, y + 20, "").setFontStyle(PathBuilder.UI.fonts["Label"]);
    
    //TODO: implement container
    this.linebutton = this.ui.add.text(x, y, "Line",null,null,null,this.switchdrawmode,["Line"],this).setFontStyle(PathBuilder.UI.fonts["Button"]);
    this.quadbutton = this.ui.add.text(x, y, "Quadratic",null,null,null,this.switchdrawmode,["QuadraticBezier"],this).setFontStyle(PathBuilder.UI.fonts["Button"]);
    this.cubicbutton = this.ui.add.text(x, y, "Cubic",null,null,null,this.switchdrawmode,["CubicBezier"],this).setFontStyle(PathBuilder.UI.fonts["Button"]);
    this.splinebutton = this.ui.add.text(x, y, "Spline",null,null,null,this.switchdrawmode,["Spline"],this).setFontStyle(PathBuilder.UI.fonts["Button"]);
    this.ellipsebutton = this.ui.add.text(x, y, "Ellipse",null,null,null,this.switchdrawmode,["Ellipse"],this).setFontStyle(PathBuilder.UI.fonts["Button"]);

    this.menu = [this.linebutton, this.quadbutton, this.cubicbutton, this.splinebutton, this.ellipsebutton  ];

    this.menu.forEach(function(element){ element.setVisible(false)});

    this.scene.events.on('switchmode', this.switchmode, this);

    this.scene.add.existing(this);

}

Pointer.prototype = Object.create(Phaser.GameObjects.Image.prototype);
Object.assign(Pointer.prototype, Element.prototype);

Pointer.prototype.constructor = Pointer;

Pointer.prototype.switchmode = function (mode) {

    if (mode == "draw") {
        this.setVisible(true);
        this.lbl.setVisible(true);
        this.menu.forEach(function(element){ element.setVisible(false)});        
    }
    if (mode == "normal") {
        this.setVisible(false);
        this.menu.forEach(function(element){ element.setVisible(false)});
    }
    if (mode == "select"){
        this.scene.undo();

        this.setVisible(false);  
        this.menu.forEach(function(element){ element.setVisible(true)});
    
        this.linebutton.setPosition(this.x - 50, this.y - 50);    
        this.quadbutton.setPosition(this.x , this.y - 50);   
        this.cubicbutton.setPosition(this.x +50, this.y - 50);        
        this.splinebutton.setPosition(this.x -50, this.y + 50);        
        this.ellipsebutton.setPosition(this.x , this.y + 50);  
    }
}

Pointer.prototype.switchdrawmode = function (mode) {
    this.scene.drawmode = mode;
    this.scene.drawmodelabel.setText("curve: " + mode);
    this.menu.forEach(function(element){ element.setVisible(false)});    
    this.scene.switchmode("draw");
}

Pointer.prototype.update = function () {
    
        this.x = this.scene.input.activePointer.x;
        this.y = this.scene.input.activePointer.y;
    
        if(this.scene.input.activePointer.isDown && this.scene.input.activePointer.dragState == 0)
        {
            var down = (this.scene.time.now - this.scene.input.activePointer.downTime);
        
            if(down>500&&this.scene.mode !== "select")
            {   
                this.lockX = this.x;
                this.lockY = this.y;
                this.scene.switchmode("select");
            }
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

module.exports = Pointer;
