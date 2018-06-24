import Point from "./Point";

export default class EndPoint extends Point{

    constructor(ui, vector, curve, key, mapping){
        super(ui, vector, curve, key, mapping);

        this.lbl.setFontStyle(PathBuilder.UI.fonts["EndPoint"]);
    }

}
