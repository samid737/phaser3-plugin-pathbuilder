
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
        this.importbutton = this.middle.add.text(700, 400, 'import', null, null, null, this.import, [], this);
        this.exportbutton = this.middle.add.text(700, 500, 'export', null, null, null, this.export, [], this);
        this.previewbutton = this.middle.add.text(10, 500, 'preview', null, null, null, this.preview, [], this);

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
        this.vectors = [];
        this.drawpanel.elements.forEach(function (element) { element.destroy() });
        this.drawpanel.elements = [];
        this.graphics.clear();
        //FIXME: destroy removes path, pointer. needs reset function.
        this.path.curves = [];

    },
    place: function (ui, x, y) {

        var vector = new Phaser.Math.Vector2(x, y);

        if (this.vectors.length == 0) {
            this.point = ui.add.endpoint(vector, 'endpoint');
            return;
        }

        if (this.drawmode == "Line") {

            this.spline = null;

            var previous = this.vectors[this.vectors.length - 1];

            if (this.vectors.length > 1) {
                var c = new this.curves[this.drawmode](previous, vector);
                this.path.add(c);
            }

            this.point = ui.add.endpoint(vector, 'endpoint');

        }

        if (this.drawmode == "QuadraticBezier") {

            this.spline = null;
            
            var control = new Phaser.Math.Vector2(x, y);

            var previous = this.vectors[this.vectors.length - 1];

            control = control.add(previous);
            control = control.divide(new Phaser.Math.Vector2(2, 2));

            var c = new this.curves[this.drawmode](previous, control, vector);
            this.path.add(c);

            this.point = ui.add.controlpoint(control, 'controlpoint');

            this.point = ui.add.endpoint(vector, 'endpoint');

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

            this.point = ui.add.controlpoint(control1, 'controlpoint');
            this.point = ui.add.controlpoint(control2, 'controlpoint');

            this.point = ui.add.endpoint(vector, 'endpoint');
        }

        if (this.drawmode == "Spline") {

            var previous = this.vectors[this.vectors.length - 1];

            if (this.spline == null) {
                var c = new this.curves[this.drawmode]([previous.x, previous.y, vector.x, vector.y]);
                this.spline = c;
                this.path.add(c);

            }

            this.path.segments += 8;

            if (this.vectors.length == 1) {

                this.point = ui.add.controlpoint(vector, 'controlpoint');

            } else {

                this.point = ui.add.controlpoint(vector, 'controlpoint');

                this.spline.addPoints([vector.x, vector.y]);

            }
            this.spline.points[this.spline.points.length - 1] = vector;
            this.spline.points[this.spline.points.length - 2] = previous;

        }

        if (this.drawmode == "Ellipse") {

            this.spline = null;
            
            var previous = this.vectors[this.vectors.length - 1];

            var c = new this.curves[this.drawmode]();
            this.path.add(c);
            c.p0 = vector;

            var dist = new Phaser.Math.Vector2(vector.x + 100, vector.y + 100);

            //map control point coordinates to radii
            this.point = ui.add.endpoint(vector, 'endpoint');

            this.point = ui.add.controlpoint(dist, 'controlpoint',
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
    freeze: function (tw, s, ui) {
        //TODO:rewrite
        ui.scene.manager.scenes[0].scene.pause();
    },
    unfreeze: function (tw, s, ui) {
        ui.scene.manager.scenes[0].scene.resume();
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
            
            follower.start({
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

