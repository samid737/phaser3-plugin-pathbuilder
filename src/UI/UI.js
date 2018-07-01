import Menu from "./Menu";
import Button from "./Button";
import Point from "./Point/Point";
import EndPoint from "./Point/EndPoint";
import ControlPoint from "./Point/ControlPoint";
import Label from "./Label";

export default class UI { 

    constructor(scene){
        this.scene = scene;
        this.elements = [];
    
        this.add = {
            menu: function (x, y) {
                let m = new Menu(this.ui, x, y);
                this.ui.scene.add.existing(m);
                return m;
            },
            button: function (x, y, text, key, frame, target, callback, args, context) {
                let tb = new Button(this.ui, x, y, text, key, frame, target, callback, args, context);
                this.ui.scene.add.existing(tb);
                return tb;
            },
            label: function (x, y, text, target, callback, args, context) {
                let l = new Label(this.ui, x, y, text, target, callback, args, context);
                this.ui.scene.add.existing(l);
                return l;
            },            
            point: function (x, y, curve, key, mapping) {
                let p = new Point(this.ui, x, y, curve, key, mapping);
                this.ui.scene.add.existing(p);
                return p;
            },
            endpoint: function (x, y, curve, key, mapping) {
                let p = new EndPoint(this.ui, x, y, curve, key, mapping);
                this.ui.scene.add.existing(p);
                return p;
            },
            controlpoint: function (x, y, curve, key, mapping) {
                let p = new ControlPoint(this.ui, x, y, curve, key, mapping);
                this.ui.scene.add.existing(p);
                return p;
            },
            // image: function (x, y, key, frame) {
            //     let i = new Image(this.ui, x, y, key, frame);
            //     this.ui.scene.add.existing(i);
            //     return i;
            // }
        }
        this.add.ui = this;
        this.camera = this.scene.cameras.add();
    }

    hide() {
        this.elements.forEach(function (element) { element.visible = false });
        this.scene.switchmode("normal");
        this.translate(0, this.scene.cameras.main.height, 400, this.scene.unfreeze);
    }
    show() {
        this.elements.forEach(function (element) { element.visible = true });
        this.scene.switchmode("normal");
        this.translate(0, 0, 400, this.scene.freeze);
    }
    translate(x, y, speed, callback) {
        this.scene.tweens.add({
            targets: this.camera,
            scrollX: x,
            scrollY: y,
            duration: speed,
            ease: "Cubic.easeOut"
        });
        this.scene.time.delayedCall(speed, callback, [], this.scene);
    }
    update() {
        this.elements.forEach(function (element) { element.update() });
    }
    destroy() {
        this.elements.forEach(function (element) { element.destroy() });
    }

}

//TODO: find sol
UI.fonts = {
    "Button": { fontFamily: 'Arial', fontSize: 16, color: '#00ff00' },
    "Point": { fontFamily: 'Arial', fontSize: 12, color: '#00ff00' },
    "EndPoint": { fontFamily: 'Arial', fontSize: 12, color: '#00ff00' },
    "ControlPoint": { fontFamily: 'Arial', fontSize: 10, color: '#00ff00' },
    "Label": { fontFamily: 'Arial', fontSize: 16, color: '#ffff00' },
};

