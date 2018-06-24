import Point from "./Point";

export default class ControlPoint extends Point
{

    constructor(ui, vector, curve, key, mapping)
    {
        super(ui, vector, curve, key, mapping);

        this.setScale(0.75, 0.75);

        this.lbl.setFontStyle(PathBuilder.UI.fonts["ControlPoint"]);
        this.lbl.visible = false;

        this.on('pointermove', function (pointer, gameObject)
        {
            this.lbl.visible = true;
        });

        this.on('pointerout', function (pointer, gameObject)
        {
            this.lbl.visible = false;
        });

        this.on('dragend', function (pointer, gameObject)
        {
            this.lbl.visible = false;
        });
    }
}