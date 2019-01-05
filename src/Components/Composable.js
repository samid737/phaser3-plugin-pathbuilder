import { mix, mixin } from "es6-mixin";

class Composable {
    addComponent(componentname, ...args){
        mixin(this, componentname,  ...args);
        let merge = Object.assign(this, new componentname(...args));       
        return merge;
    }
}

export default Composable;