
var Point = require("./Point");

var ControlPoint = function (ui, vector, curve, key, mapping) {
    Point.call(this, ui, vector, curve, key, mapping);
    this.setScale(0.75, 0.75);

    this.lbl.setFontStyle(PathBuilder.UI.fonts["ControlPoint"]);
    this.lbl.visible = false;

    this.on('pointermove', function (pointer, gameObject) {
        this.lbl.visible = true;
    });

    this.on('pointerout', function (pointer, gameObject) {
        this.lbl.visible = false;
    });

    this.on('dragend', function (pointer, gameObject) {
        this.lbl.visible = false;
    });
}

ControlPoint.prototype = Object.create(Point.prototype);
ControlPoint.prototype.constructor = ControlPoint;

module.exports = ControlPoint;
