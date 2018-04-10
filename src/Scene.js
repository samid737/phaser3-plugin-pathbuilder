
var UI = require("./UI/UI");
var Pointer = require("./UI/Pointer");

var Scene = function () {

}

Scene.prototype = {
    preload: function () {

    },

    create: function () {
        this.tool = { "normal": null, "draw": this.place};
        this.mode = "normal";

        this.curves = {"Line": Phaser.Curves.Line, "Ellipse": Phaser.Curves.Ellipse, "QuadraticBezier": Phaser.Curves.QuadraticBezier, "CubicBezier": Phaser.Curves.CubicBezier, "Spline": Phaser.Curves.Spline };

        this.events.emit('switchmode', this.mode);


        this.zoomIn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.zoomOut = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.release = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.W = this.cameras.main.width;
        this.H = this.cameras.main.height;
        this.drawmode = "CubicBezier";

        //TODO: seperate class  
        this.vectors = [];

        //reserved for spline building
        this.spline = null;
        this.path = this.add.path();
        this.path.segments = 32;
        this.graphics = this.add.graphics();

        this.drawpanel = new UI(this);
        this.middle = new UI(this);
        this.top = new UI(this);

        //this.drawpanel.elements.push(this.graphics);
        this.graphics.fillStyle(0xff0000,1);
        this.graphics.fillCircle(10,10,8);
        this.graphics.generateTexture('endpoint', 32, 32);
        this.graphics.fillStyle(0x00ff00,1);
        this.graphics.fillCircle(10,10,8);
        this.graphics.generateTexture('controlpoint', 32, 32);
        this.graphics.clear();

        //TODO: rewrite callback implementation
        //TODO: adjust to game size
        this.hidebutton = this.top.add.text(10, 300, 'hide', null, null, null, [this.drawpanel.hide, this.middle.hide], [], [this.drawpanel, this.middle]);
        this.showbutton = this.top.add.text(10, 350, 'show', null, null, null, [this.drawpanel.show, this.middle.show], [], [this.drawpanel, this.middle]);
        this.drawbutton = this.middle.add.text(10, 200, 'draw', null, null, null, this.switchmode, ["draw"], this);
        this.clearbutton = this.middle.add.text(10,100,'clear',null,null,null, this.clear,[], this);  
        this.undobutton = this.middle.add.text(10,50,'undo',null,null,null, this.undo,[], this);  
        
        this.importbutton = this.middle.add.text(this.W -100, this.H - 200, 'import', null, null, null, this.import, [], this);
        this.exportbutton = this.middle.add.text(this.W -100, this.H - 100, 'export', null, null, null, this.export, [], this);

        this.pausebutton = this.middle.add.text(10, this.H - 200,'pause',null,null,null, this.freeze,[], this);  
        this.resumebutton = this.middle.add.text(10, this.H - 150,'resume',null,null,null, this.unfreeze,[], this);  
        
        this.previewbutton = this.middle.add.text(10, this.H - 100, 'preview', null, null, null, this.preview, [], this);

        this.modelabel = this.middle.add.label(100, 20, 'mode: ', null, null, null, null, this);
        this.drawmodelabel = this.middle.add.label(400, 20, 'curve: ' +this.drawmode, null, null, null, null, this);
        
        this.pointer = new Pointer(this.middle, 100, 100, 'controlpoint');

        this.setCameras();

        this.drawpanel.hide();
        this.middle.hide();

        //TODO: debug internal, remove in prod
        // var gui = new dat.GUI({
        //     width: 200
        // });

        // gui.add(this.drawpanel, 'hide');
        // gui.add(this.drawpanel, 'show');
        // gui.add(this.pointer, 'snap', 1, 100, 2);

    },
    update: function () {
        this.drawpanel.update();
        this.pointer.update();
        this.look(this.cameras.main);
        //this.drawpanel.camera.setZoom(Math.sin(this.time.now/100000)+1);
        //this.cameras.main.setZoom(Math.sin(this.time.now/100000)+1);
        //this.middle.camera.setZoom(Math.sin(this.time.now/100000)+1);
        //this.top.camera.setZoom(Math.sin(this.time.now/100000)+1);
    },
    setCameras: function () {
        this.drawpanel.camera.ignore(this.middle.elements);
        this.drawpanel.camera.ignore(this.top.elements);

        this.middle.camera.ignore(this.graphics);
        this.middle.camera.ignore(this.drawpanel.elements);
        this.middle.camera.ignore(this.top.elements);

        this.top.camera.ignore(this.graphics);
        this.top.camera.ignore(this.middle.elements);
        this.top.camera.ignore(this.drawpanel.elements);

        this.cameras.main.ignore(this.children.list);
    },
    switchmode: function (mode) {
        this.mode = mode;
        this.modelabel.setText("mode: " + this.mode);
        this.events.emit('switchmode', this.mode);
    },
    clear: function () {
        var _this = this;
        this.path.curves.forEach(function(curve){_this.undo()});
        this.drawpanel.elements.forEach(function (element) { element.destroy() });
        this.vectors = [];
        this.drawpanel.elements = [];
        this.path.curves = [];     
        this.spline  = null;
        
        this.graphics.clear();
    },
    undo: function() { 
        //TODO: extend curve class  
        if(this.vectors.length>1){
            var _this = this;        
            var lastcurve = this.path.curves[this.path.curves.length -1];
            lastcurve.controlpoints.forEach(function(point){point.destroy();_this.vectors.pop()});
            
            this.path.curves.pop();
            this.spline  = null;  
    
            this.graphics.clear();        
            this.draw();
        }    
    },
    place: function (ui, x, y) {
        //TODO: extend A curve class for each case, add A factory entry for curves.

        var vector = new Phaser.Math.Vector2(x, y);

        if (this.vectors.length == 0) {
            this.point = ui.add.endpoint(vector, null,'endpoint');
            return;
        }

        if (this.drawmode == "Line") {

            this.spline = null;

            var previous = this.vectors[this.vectors.length - 1];

            if (this.vectors.length > 0) {
                var c = new this.curves[this.drawmode](previous, vector);
                
                this.path.add(c);
                c.controlpoints = [];                
            }

            this.point = ui.add.endpoint(vector, c, 'endpoint');

        }

        if (this.drawmode == "QuadraticBezier") {

            this.spline = null;
            
            var control = new Phaser.Math.Vector2(x, y);

            var previous = this.vectors[this.vectors.length - 1];

            control = control.add(previous);
            control = control.divide(new Phaser.Math.Vector2(2, 2));

            var c = new this.curves[this.drawmode](previous, control, vector);
            
            this.path.add(c);
            c.controlpoints = [];
            
            this.point = ui.add.controlpoint(control, c, 'controlpoint');

            this.point = ui.add.endpoint(vector, c, 'endpoint');

        }

        if (this.drawmode == "CubicBezier") {

            this.spline = null;
            
            var control1 = new Phaser.Math.Vector2(x, y);
            var control2 = new Phaser.Math.Vector2(x, y);

            var previous = this.vectors[this.vectors.length - 1];

            control1.x = previous.x + (x - previous.x) * 0.25;
            control1.y = previous.y + (y - previous.y) * 0.25;

            control2.x = previous.x + (x - previous.x) * 0.75;
            control2.y = previous.y + (y - previous.y) * 0.75;
            
            var c = new this.curves[this.drawmode](previous, control1, control2, vector);
            
            this.path.add(c);
            c.controlpoints = [];
            
            this.point = ui.add.controlpoint(control1, c, 'controlpoint');
            this.point = ui.add.controlpoint(control2, c, 'controlpoint');

            this.point = ui.add.endpoint(vector, c, 'endpoint');

        }

        if (this.drawmode == "Spline") {

            var previous = this.vectors[this.vectors.length - 1];

            if (this.spline == null) {
                var c = new this.curves[this.drawmode]([previous.x, previous.y, vector.x, vector.y]);
                this.spline = c;

                this.path.add(c);
                c.controlpoints = [];
                
            }

            this.path.segments += 8;

            if (this.vectors.length == 1) {

                this.point = ui.add.controlpoint(vector, this.spline, 'controlpoint');
                
            } else {

                this.point = ui.add.controlpoint(vector, this.spline, 'controlpoint');
                
                this.spline.addPoints([vector.x, vector.y]);

            }

            this.spline.points[this.spline.points.length - 1] = vector;
            this.spline.points[this.spline.points.length - 2] = previous;

        }

        if (this.drawmode == "Ellipse") {

            this.spline = null;
            
            var previous = this.vectors[this.vectors.length - 1];

            var c = new this.curves[this.drawmode](vector.x, vector.y, 100,100);
            
            this.path.add(c);
            c.controlpoints = [];

            c.p0 = vector;

            var dist = new Phaser.Math.Vector2(vector.x + 100, vector.y + 100);

            //map control point coordinates to radii
            this.point = ui.add.endpoint(vector, c, 'endpoint');

            this.point = ui.add.controlpoint(dist, c, 'controlpoint',
                {
                    "src": c,
                    "data":
                    {
                        "x": { "property": "xRadius", "operator": function (src, x) { return src.p0.x - x } },
                        "y": { "property": "yRadius", "operator": function (src, y) { return src.p0.y - y } }
                    }
                });

            var anglevec = new Phaser.Math.Vector2(c.p0.x, c.p0.y + c.yRadius);

        }

        this.draw();

        this.setCameras();
    },
    move: function (graphics, vector) {

    },
    draw: function () {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.graphics.fillStyle(0xffffff, 1);
        this.path.draw(this.graphics, this.path.segments);
    },
    look = function (camera) {
        camera.zoomSpeed = 0.02;
        
        if (cam.scene.release.isDown) {
            //  Camera zoom
    
            var axisX =-(this.input.activePointer.x-(camera.width/2))/10; 
            var axisY =-(this.input.activePointer.y-(camera.height/2))/10;
            
            camera._speedX +=axisX;
            camera._speedY +=axisY;
    
            if (this.zoomIn && this.zoomIn.isDown) {
                camera._zoom = -camera.zoomSpeed;
            } else if (this.zoomOut && this.zoomOut.isDown) {
                camera._zoom = camera.zoomSpeed;
            } else {
                camera._zoom = 0;
            }
    
            //  Apply to Camera
            if (camera._speedX !== 0) {
                camera.scrollX -= ((camera._speedX) | 0);
            }
    
            if (camera._speedY !== 0) {
                camera.scrollY -= ((camera._speedY) | 0);
            }
    
            if (camera._zoom !== 0) {
                camera.zoom += camera._zoom;
    
                if (cam.zoom < 0.1) {
                    cam.zoom = 0.1;
                }
                if (cam.zoom > 2) {
                    cam.zoom = 2;
                }    
            }
        }else{
            camera._speedX/=1.1;
            camera._speedY/=1.1;
            cam.scrollX -= ((camera._speedX) | 0);
            cam.scrollY -= ((camera._speedY) | 0);
            if(camera.zoom>1.001){
                camera.zoom/=1.1;
            }
            if(camera.zoom<1.001){
                camera.zoom*=1.1;
            }      
        } 
    },
    freeze: function () {
        this.scene.manager.scenes[0].scene.pause();
    },
    unfreeze: function () {
        this.scene.manager.scenes[0].scene.resume();
    },
    import: function () {
        var data = this.cache.json.get('data');
        this.path = this.path.fromJSON(data);
        this.draw();
    },
    export: function () {
        var data = JSON.stringify(this.path.toJSON());
        console.log(data);
        var file = new Blob([data], ["data.json"]);
        var url = URL.createObjectURL(file);
        var link = document.createElement('a');
        link.href = url;
        link.download = "data.json";
        link.click();

    },
    preview: function () {
        if(this.path.curves.length !== 0){
            var follower = this.add.follower(this.path, 0, 0, 'dude');
            
            follower.startFollow({
                duration: 2000,
                rotateToPath: true,
                yoyo: true,
                onComplete: function (t, s, w) { w.destroy() },
                onCompleteParams: [follower],
                ease: 'Cubic.easeInOut'
            });   
        }
    },
    destroy: function () {
    }
};

// Scene.prototype.constructor = Scene;

module.exports = Scene;

