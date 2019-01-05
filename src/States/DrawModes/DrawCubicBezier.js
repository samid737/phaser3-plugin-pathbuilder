export default class DrawCubicBezier extends State
{
    constructor(gameObject){
        this.gameObject = gameObject;
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
