
var Button = require("./Button");
var Point = require("./Point/Point");
var EndPoint = require("./Point/EndPoint");
var ControlPoint = require("./Point/ControlPoint");
var Label = require("./Label");
//var Image = require("./Image");

var UI = function (scene) {
    this.scene = scene;
    this.elements = [];

    this.add = {
        text: function (x, y, text, key, frame, target, callback, args, context) {
            var tb = new Button(this.ui, x, y, text, key, frame, target, callback, args, context);
            this.ui.scene.add.existing(tb);
            return tb;
        },
        point: function (vector, curve, key, mapping) {
            var p = new Point(this.ui, vector, curve, key, mapping);
            this.ui.scene.add.existing(p);
            return p;
        },
        endpoint: function (vector, curve, key, mapping) {
            var p = new EndPoint(this.ui, vector, curve, key, mapping);
            this.ui.scene.add.existing(p);
            return p;
        },
        controlpoint: function (vector, curve, key, mapping) {
            var p = new ControlPoint(this.ui, vector, curve, key, mapping);
            this.ui.scene.add.existing(p);
            return p;
        },
        label: function (x, y, text, target, callback, args, context) {
            var l = new Label(this.ui, x, y, text, target, callback, args, context);
            this.ui.scene.add.existing(l);
            return l;
        },
        // image: function (x, y, key, frame) {
        //     var i = new Image(this.ui, x, y, key, frame);
        //     this.ui.scene.add.existing(i);
        //     return i;
        // }
    }
    this.add.ui = this;
    this.camera = this.scene.cameras.add();
}

//TODO: link classes
UI.fonts = {
    "Button": { fontFamily: 'Arial', fontSize: 16, color: '#00ff00' },
    "Point": { fontFamily: 'Arial', fontSize: 12, color: '#00ff00' },
    "EndPoint": { fontFamily: 'Arial', fontSize: 12, color: '#00ff00' },
    "ControlPoint": { fontFamily: 'Arial', fontSize: 10, color: '#00ff00' },
    "Label": { fontFamily: 'Arial', fontSize: 16, color: '#ffff00' },
};

UI.prototype = {
    hide: function () {
        this.elements.forEach(function (element) { element.visible = false });
        this.scene.switchmode("normal");
        this.translate(0, this.scene.cameras.main.height, 400, this.scene.unfreeze);
    },
    show: function () {
        this.elements.forEach(function (element) { element.visible = true });
        this.scene.switchmode("normal");
        this.translate(0, 0, 400, this.scene.freeze);
    },
    translate: function (x, y, speed, callback) {
        this.scene.tweens.add({
            targets: this.camera,
            scrollX: x,
            scrollY: y,
            duration: speed,
            ease: "Cubic.easeOut"
        });
        this.scene.time.delayedCall(speed, callback, [], this.scene);
    },
    update: function () {
        this.elements.forEach(function (element) { element.update() });
    },
    destroy: function () {
        this.elements.forEach(function (element) { element.destroy() });

    }
}

UI.prototype.constructor = UI;

module.exports = UI;
