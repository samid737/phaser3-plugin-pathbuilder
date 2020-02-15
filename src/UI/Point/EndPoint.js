import Point from './Point';
import UI from '../UI';

export default class EndPoint extends Point
{

    constructor (ui, x, y, key = 'endpoint')
    {
        super(ui, x, y, key);

        this.lbl.setFontStyle(UI.fonts['EndPoint']);

        return this;
    }

}
