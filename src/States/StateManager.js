class StateManager  {
    constructor(sourceStates, initialState, gameObject) {
        this.states = {};
        for (var state in sourceStates) {
            if(state.toString() != "default"){
                this.states[state] = new sourceStates[state](gameObject);
            }
        }
        this._state = this.states[initialState];
        return this;
    }
    //TODO: find solution getter setter
    getState() {
        return this._state;
    }

    setState(next, target) {
        //console.log(next);
        let previous = {};
        if (target._state != undefined) {
            target._state.exit(target.states[next]);
            previous = target._state;
        }
        target._state = target.states[next];

        target._state.enter(previous);
    }

    updateState(target) {
        target._state.update();
    }

}

export default StateManager; 