
var Point = require("./Point");

var EndPoint = function (ui, vector, key, mapping, kernel) {
    Point.call(this, ui, vector, key, mapping, kernel);
    this.lbl.setFontStyle(PathBuilder.UI.fonts["EndPoint"]);
}

EndPoint.prototype = Point.prototype;
EndPoint.prototype.constructor = EndPoint;

module.exports = EndPoint;
