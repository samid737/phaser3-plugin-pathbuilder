import Point from './Point';
import UI from '../UI';

export default class ControlPoint extends Point
{

    constructor (ui, x, y, key = 'controlpoint')
    {
        super(ui, x, y, key);

        this.setScale(0.75, 0.75);

        this.lbl.setFontStyle(UI.fonts['ControlPoint']);
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

        return this;
    }
}
