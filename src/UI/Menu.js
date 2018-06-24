import Element from "./Element";

export default class Menu extends Phaser.GameObjects.Container {

    constructor(ui, x, y)
    {
        super(ui.scene, x, y);
        Element.call(this, ui, x, y);
    }

    add(x, y, item, callback, args, context)
    {
        this[item] = this.ui.add.text(x, y, item, null, null, null, callback, args, context).setFontStyle(PathBuilder.UI.fonts["Button"]);
        Phaser.GameObjects.Container.prototype.add.call(this, this[item]);
        return this[item];
    }

    update()
    {

    }

    hide()
    {
        this.list.forEach(function (element) { element.setVisible(false) });
    }

    show()
    {
        this.list.forEach(function (element) { element.setVisible(true) });
    }

    divide()
    {

    }

}