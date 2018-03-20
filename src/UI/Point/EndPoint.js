
var Point = require("./Point");

var EndPoint = function (ui, vector, curve, key, mapping) {
    Point.call(this, ui, vector, curve, key, mapping);
    this.lbl.setFontStyle(PathBuilder.UI.fonts["EndPoint"]);
}

EndPoint.prototype = Object.create(Point.prototype);
EndPoint.prototype.constructor = EndPoint;

module.exports = EndPoint;
