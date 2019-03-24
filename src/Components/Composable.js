export default class Composable {
    addComponent(componentname, ...args){
        componentname.call(this,...args);
        return this;
    }
}
