var Element = require("./Element");

var Menu = function(ui, x, y){
    Element.call(this, ui, x, y);
    Phaser.GameObjects.Container.call(this, ui.scene, x , y);
}

Menu.prototype = Object.create(Phaser.GameObjects.Container.prototype);
Object.assign(Menu.prototype, Element.prototype);

Menu.prototype.add = function(x,y, item, callback, args, context){
    this[item] =  this.ui.add.text(x, y, item, null, null, null, callback, args, context).setFontStyle(PathBuilder.UI.fonts["Button"]);
    Phaser.GameObjects.Container.prototype.add.call(this, this[item]);
    return this[item];
}

Menu.prototype.update = function(){

}

Menu.prototype.hide = function(){
    console.log(this);
    this.list.forEach(function(element){ element.setVisible(false)});    
}

Menu.prototype.show = function(){
    this.list.forEach(function(element){ element.setVisible(true)});    
}

Menu.prototype.divide = function(){
    
}


module.exports = Menu;