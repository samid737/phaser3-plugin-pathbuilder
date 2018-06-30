import Point from "./Point";
import UI from "../UI";

export default class EndPoint extends Point{

    constructor(ui, x, y, curve, key, mapping){
        super(ui, x, y,  curve, key, mapping);

        this.lbl.setFontStyle(UI.fonts["EndPoint"]);
    }

}
