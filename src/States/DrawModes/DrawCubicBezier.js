import State from "../State";
class DrawCubicBezier extends State
{
    constructor(gameObject){
        super(gameObject);
    }

    enter (oldState)
    {
        console.log("oldState:" + oldState.constructor.name);
    }

    exit(newState)
    {
        console.log("newState:" + newState.constructor.name);
    }

    update(){

    }

}
