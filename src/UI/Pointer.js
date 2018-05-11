
var Element = require("./Element");

var Pointer = function (ui, x, y, key, frame) {
    Element.call(this, ui, x, y);
    Phaser.GameObjects.Image.call(this, ui.scene, x, y, key);

    this.alpha = 0.5;

    this.snap = 50;

    //global input listener 

    this.scene.input.on('pointerdown', function (pointer, gameObject) {

        if (this.scene.mode == "draw" && pointer.dragState ==0) {
            if (gameObject.length ==0 && (pointer.x > 50 && pointer.x < this.scene.W - 100)) {
                
                var _dx = this.scene.drawpanel.camera.scrollX;
                var _dy = this.scene.drawpanel.camera.scrollY;
                
                this.scene.place(this.scene.drawpanel, this.x + _dx, this.y +_dy);
            }
        } 


        if(pointer.rightButtonDown() && this.scene.input.activePointer.dragState == 0)
        {
            this.lockX = pointer.x;
            this.lockY = pointer.y;

            //game.canvas.style.cursor = "default";                        
            
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
        // TODO: abstraction
        
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
    if(mode == "hand"){
        game.canvas.style.cursor = "grab";
        
        this.setVisible(true);
        this.lbl.setVisible(true);

    }
}
Pointer.prototype.switchCursor = function(){
    game.canvas.style.cursor = this.scene.cursors[this.scene.mode];
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

Pointer.prototype.hitTestPointer = function (pointer)
    {
        var camera = this.cameras.getCameraBelowPointer(pointer);
    
        if (camera)
        {
            var over = [];
            
            // Do A hitTest for each camera
            for (var i = this.cameras.cameras.length - 1; i >= 0; i--)
            {
                var c = this.cameras.cameras[i];
                pointer.camera = c;

                //  Get a list of all objects that can be seen by the camera below the pointer in the scene and store in 'output' array.
                //  All objects in this array are input enabled, as checked by the hitTest method, so we don't need to check later on as well.
                over = this.manager.hitTest(pointer.x, pointer.y, this._list, c);

                if(over.length > 0)
                {

                    //  Filter out the drop zones
                    for (var s = 0; s < over.length; s++)
                    {
                        var obj = over[s];

                        if (obj.input.dropZone)
                        {
                            this._tempZones.push(obj);
                        }
                    }

                    return over;
                }
                
            }
            
            return over;
        }
        else
        {
            return [];
        }
    },

module.exports = Pointer;
