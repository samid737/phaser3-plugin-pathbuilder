
var Element = require("../Element");

var Point = function (ui, vector, key, mapping) {
    Element.call(this, ui, vector.x, vector.y);
    Phaser.GameObjects.Image.call(this, ui.scene, vector.x, vector.y, key);

    this.setInteractive();
    this.scene.input.setDraggable(this);

    this.setData('vector', vector);
    this.scene.vectors.push(vector);

    if (mapping) {
        this.mapping = mapping;
    }

    this.on('pointerout', function (pointer, gameObject) {
        this.scene.pointer.lbl.visible = true;
    });

    this.on('drag', function (pointer, gameObject) {
        this.x = this.scene.pointer.x;
        this.y = this.scene.pointer.y;

        this.scene.pointer.lbl.visible = false;

        this.data.get('vector').set(this.x, this.y);

        if (this.mapping) {
            var m = this.mapping;
            var _this = this;

            for (var t in m.data) {
                m.src[m.data[t].property] = m.data[t].operator(m.src, _this[t]);
            }
        }

        this.scene.graphics.clear();
        this.scene.draw();

    });

    this.lbl = this.ui.add.label(this.x + 10, this.y + 10, "").setFontStyle(PathBuilder.UI.fonts["Point"]);

}

Point.prototype = Object.create(Phaser.GameObjects.Image.prototype);
Object.assign(Point.prototype, Element.prototype);

Point.prototype.constructor = Point;

Point.prototype.update = function () {
    this.lbl.x = this.x + 10;
    this.lbl.y = this.y + 10;
    this.lbl.setText("x: " + this.x + " y: " + this.y);
}

module.exports = Point;
