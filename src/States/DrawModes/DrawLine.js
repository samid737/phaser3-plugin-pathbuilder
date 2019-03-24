import State from "../State";
class DrawLine extends State
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
