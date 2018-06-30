import Element from "./Element";
import UI from "./UI";

export default class Menu extends Element(Phaser.GameObjects.Container) {

    constructor(ui, x, y)
    {
        super(ui, x, y);
    }

    add(x, y, item, callback, args, context)
    {
        this[item] = this.ui.add.text(x, y, item, null, null, null, callback, args, context).setFontStyle(UI.fonts["Button"]);
        //TODO: es6
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