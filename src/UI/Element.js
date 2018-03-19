
var Element = function (ui, x, y) {
    this.ui = ui;
    this.scene = ui.scene;
    this.x = x;
    this.y = y;
    this.ui.elements.push(this);

    this.scene.cameras.main.ignore(this);
    var l = 1 << this.scene.cameras.cameras.length - 1;
    this.cameraFilter = l & ~this.ui.camera._id;

    return this;
}

Element.prototype.update = function () {

}

Element.prototype.toggle = function () {
    this.visible = !this.visible;
}

Element.prototype.click = function () {
    var callbackcontext = this.callbackcontext;
    var args = this.args;

    if (this.callbacks instanceof Array) {
        this.callbacks.forEach(function (callback, index) { callback.apply(callbackcontext[index], args) });
    } else {
        this.callbacks.apply(this.callbackcontext, this.args);
    }
}

Element.prototype.hover = function () {

}

Element.prototype.out = function () {

}

module.exports = Element;
