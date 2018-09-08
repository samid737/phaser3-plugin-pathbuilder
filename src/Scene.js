import UI from "./UI/UI";
import Pointer from "./UI/Pointer";

export default class Scene extends Phaser.Scene
{

    constructor(config)
    {
        super(config);
        if (window.addEventListener)
        {
            window.addEventListener('DOMMouseScroll', this.scroll, false);
            window.onmousewheel = this.scroll.bind(this);
        }
    }

    preload()
    {

    }

    create()
    {
        //TODO: event driven modes, move
        this.tool = { "normal": null, "draw": this.place };
        this.mode = "normal";
        this.cursors = { "normal": "default", "draw": "copy", "select": "default", "hand": "move" };
        this.curves = { "Line": Phaser.Curves.Line, "Ellipse": Phaser.Curves.Ellipse, "QuadraticBezier": Phaser.Curves.QuadraticBezier, "CubicBezier": Phaser.Curves.CubicBezier, "Spline": Phaser.Curves.Spline };
       
        this.events.emit('switchmode', this.mode);

        this.input.mouse.disableContextMenu();

        this.drawmode = "CubicBezier";

        //TODO: seperate class  
        this.vectors = [];

        //reserved for spline building
        this.spline = null;
        this.path = this.add.path();
        this.path.segments = 32;
        this.graphics = this.add.graphics();

        this.drawpanel = this.add.ui(this);
        this.middle = this.add.ui(this);
        this.top = this.add.ui(this);

        //this.drawpanel.elements.push(this.graphics);
        this.graphics.fillStyle(0xff0000, 1).fillCircle(10, 10, 8).generateTexture('endpoint', 32, 32);
        this.graphics.fillStyle(0x00ff00, 1).fillCircle(10, 10, 8).generateTexture('controlpoint', 32, 32);
        this.graphics.clear();
        
        this.pointer = this.add.superpointer(this.middle, 100, 100, 'controlpoint');

        this.W = this.cameras.main.width;
        this.H = this.cameras.main.height;
        //TODO: rewrite callback implementation
        this.hidebutton = this.top.add.button(10, 300, 'hide', null, null, null, [this.drawpanel.hide, this.middle.hide], [], [this.drawpanel, this.middle]);
        this.showbutton = this.top.add.button(10, 350, 'show', null, null, null, [this.drawpanel.show, this.middle.show], [], [this.drawpanel, this.middle]);
        this.viewbutton = this.top.add.button(this.W - 100, this.H * 0.1, 'reset view', null, null, null, this.resetView, [], this);
        this.snapbutton = this.middle.add.toggle(this.W - 100, this.H * 0.2, 'snap', null, null, null, this.pointer.snap, [], this.pointer);

        this.drawbutton = this.middle.add.button(10, 200, 'draw', null, null, null, this.switchmode, ["draw"], this);
        this.clearbutton = this.middle.add.button(10, 100, 'clear', null, null, null, this.clear, [], this);
        this.undobutton = this.middle.add.button(10, 50, 'undo', null, null, null, this.undo, [], this);

        this.importbutton = this.middle.add.button(this.W - 100, this.H - 200, 'import', null, null, null, this.importJSON, [], this);
        this.exportbutton = this.middle.add.button(this.W - 100, this.H - 100, 'export', null, null, null, this.exportJSON, [], this);

        this.pausebutton = this.middle.add.button(10, this.H - 200, 'pause', null, null, null, this.freeze, [], this);
        this.resumebutton = this.middle.add.button(10, this.H - 150, 'resume', null, null, null, this.unfreeze, [], this);

        this.previewbutton = this.middle.add.button(10, this.H - 100, 'preview', null, null, null, this.preview, [], this);

        this.modelabel = this.middle.add.label(100, 20, 'mode: ', null, null, null, null, this);
        this.drawmodelabel = this.middle.add.label(400, 20, 'curve: ' + this.drawmode, null, null, null, null, this);

        this.setCameras();

        this.drawpanel.hide();
        this.middle.hide();

    }
    update()
    {
        this.drawpanel.update();
        this.pointer.update();
        //this.drawpanel.camera.setZoom(Math.sin(this.time.now/100000)+1);
        //this.cameras.main.setZoom(Math.sin(this.time.now/100000)+1);
        //this.middle.camera.setZoom(Math.sin(this.time.now/100000)+1);
        //this.top.camera.setZoom(Math.sin(this.time.now/100000)+1);
    }
    setCameras()
    {
        this.drawpanel.camera.ignore(this.middle.elements);
        this.drawpanel.camera.ignore(this.top.elements);

        this.middle.camera.ignore(this.graphics);
        this.middle.camera.ignore(this.drawpanel.elements);
        this.middle.camera.ignore(this.top.elements);

        this.top.camera.ignore(this.graphics);
        this.top.camera.ignore(this.middle.elements);
        this.top.camera.ignore(this.drawpanel.elements);

        this.cameras.main.ignore(this.children.list);

        this.supercamera = this.scene.manager.scenes[0].cameras.main;
    }
    switchmode(mode)
    {
        this.mode = mode;
        this.modelabel.setText("mode: " + this.mode);
        this.pointer.switchCursor();
        this.events.emit('switchmode', this.mode);
    }
    clear()
    {
        let _this = this;
        this.path.curves.forEach(function (curve) { _this.undo() });
        this.drawpanel.elements.forEach(function (element) { element.destroy() });
        this.vectors = [];
        this.drawpanel.elements = [];
        this.path.curves = [];
        this.spline = null;

        this.graphics.clear();
    }
    undo()
    {
        //TODO: extend curve class  
        if (this.vectors.length > 1)
        {
            let _this = this;
            let lastcurve = this.path.curves[this.path.curves.length - 1];
            lastcurve.controlpoints.forEach(function (point) { point.destroy(); _this.vectors.pop() });

            this.path.curves.pop();
            this.spline = null;

            this.graphics.clear();
            this.draw();
        }
    }
    place(ui, x, y)
    {
        //TODO: extend A curve class for each case, add A factory entry for curves.
        //TODO: add abstraction

        if (this.vectors.length == 0)
        {
            let p0 = ui.add.endpoint(x, y);
            return;
        }

        if (this.drawmode == "Line")
        {

            this.spline = null;

            let p0 = this.vectors[this.vectors.length - 1];

            let p1 = ui.add.endpoint(x, y);

            if (this.vectors.length > 0)
            {
                let c = new this.curves[this.drawmode](p0, p1.vec2);

                this.path.add(c);
                c.controlpoints = [];

                p1.fuse(c);              

            }


        }

        if (this.drawmode == "QuadraticBezier")
        {
            this.spline = null;

            let p0 = this.vectors[this.vectors.length - 1];

            let p1 = ui.add.controlpoint(p0.x + (x - p0.x) * 0.5, p0.y + (y - p0.y) * 0.5);

            let p2 = ui.add.endpoint(x, y);

            let c = new this.curves[this.drawmode](p0, p1.vec2, p2.vec2);

            this.path.add(c);
            c.controlpoints = [];

            p1.fuse(c);
            p2.fuse(c);

        }

        if (this.drawmode == "CubicBezier")
        {

            this.spline = null;

            let p0 = this.vectors[this.vectors.length - 1];

            let p1 = ui.add.controlpoint(p0.x + (x - p0.x) * 0.25, p0.y + (y - p0.y) * 0.25);
            let p2 = ui.add.controlpoint(p0.x + (x - p0.x) * 0.75, p0.y + (y - p0.y) * 0.75);

            let p3 = ui.add.endpoint(x, y);

            let c = new this.curves[this.drawmode](p0, p1.vec2, p2.vec2, p3.vec2);

            this.path.add(c);
            c.controlpoints = [];

            p1.fuse(c);
            p2.fuse(c);
            p3.fuse(c);
        }

        if (this.drawmode == "Spline")
        {

            let p0 = this.vectors[this.vectors.length - 1];
            let px = 0;

            if (this.spline == null)
            {

                px = ui.add.endpoint(x, y);

                let c = new this.curves[this.drawmode]([p0.x, p0.y, px.vec2.x, px.vec2.y]);
                this.spline = c;

                this.path.add(c);
                c.controlpoints = [];

            }

            this.path.segments += 8;

            if (this.vectors.length == 1)
            {

                px = ui.add.controlpoint(x, y);

            } else
            {

                px = ui.add.controlpoint(x, y);

                this.spline.addPoints([x, y]);
            }

            this.spline.points[this.spline.points.length - 1] = px.vec2;
            this.spline.points[this.spline.points.length - 2] = p0;

            px.fuse(this.spline);

        }

        if (this.drawmode == "Ellipse")
        {

            this.spline = null;

            let p0 = this.vectors[this.vectors.length - 1];

            let p1 = ui.add.endpoint(x,y);
            let p2 = ui.add.controlpoint(x + 100, y + 100);

            let c = new this.curves[this.drawmode](p1.vec2.x, p1.vec2.y, 100, 100);

            this.path.add(c);
            c.controlpoints = [];

            p1.fuse(c);
            p2.fuse(c);

            c.p0 = p1;

            //map control point coordinates to radii

            p2.map(                {
                "src": c,
                "data":
                {
                    "x": { "property": "xRadius", "operator": function (src, x) { return src.p0.vec2.x - x } },
                    "y": { "property": "yRadius", "operator": function (src, y) { return src.p0.vec2.y - y } }
                }
            })

        }

        this.draw();

        this.setCameras();
    }
    move(graphics, vector)
    {

    }
    draw()
    {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xffffff, 1).fillStyle(0xffffff, 1);
        this.path.draw(this.graphics, this.path.segments);
    }
    look(camera)
    {

        camera.scrollY = (this.pointer.lastY - this.input.activePointer.y);
        camera.scrollX = (this.pointer.lastX - this.input.activePointer.x);
    }
    scroll(event)
    {
        let delta = 0;
        if (event.wheelDelta)
        {
            delta = event.wheelDelta / 120;
        } else if (event.detail)
        {
            delta = -event.detail / 3;
        }

        // TODO: move to pointer 
        if (delta > 0)
        {
            game.canvas.style.cursor = "zoom-in";
        }
        if (delta < 0)
        {
            game.canvas.style.cursor = "zoom-out";
        }

        this.time.delayedCall(250, this.pointer.switchCursor, [], this.pointer);

        this.drawpanel.camera.setZoom(this.drawpanel.camera.zoom +delta * 0.1);
        this.drawpanel.camera.zoom += delta * 0.1;
        this.supercamera.zoom += delta * 0.1;
        return delta;
    }
    resetView()
    {
        this.drawpanel.camera.setZoom(1).setScroll(0, 0);
        this.supercamera.setZoom(1).setScroll(0, 0);
    }
    freeze()
    {
        this.scene.manager.scenes[0].scene.pause();
    }
    unfreeze()
    {
        this.scene.manager.scenes[0].scene.resume();
    }
    importJSON()
    {
        let data = this.cache.json.get('data');
        this.path = this.path.fromJSON(data);
        this.draw();
    }
    exportJSON()
    {
        let data = JSON.stringify(this.path.toJSON());
        console.log(data);
        let file = new Blob([data], ["path.json"]);
        let fuse = document.createElement('a');
        fuse.href = URL.createObjectURL(file);
        fuse.download = "path.json";
        fuse.click();

    }
    preview()
    {
        if (this.path.curves.length !== 0)
        {
            let follower = this.add.follower(this.path, 0, 0, 'dude');

            this.cameras.main.ignore(follower);
            this.middle.camera.ignore(follower);
            this.top.camera.ignore(follower);

            follower.startFollow({
                duration: 2000,
                rotateToPath: true,
                yoyo: true,
                onComplete: function (t, s, w) { w.destroy() },
                onCompleteParams: [follower],
                ease: 'Cubic.easeInOut'
            });
        }
    }

    destroy()
    {
    }
}
