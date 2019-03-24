const StateManager = function (sourceStates, initialState) {
    this.states = {};
    for (var state in sourceStates) {
        console.log(state);
        if (state.toString() != "default") {
            this.states[state] = new sourceStates[state](this);
        }
    }

    this._state = this.states[initialState];
 
    this.getState = function () {
        return this._state;
    }

    this.setState = function (next) {
        console.log(next);
        let previous = 0;
        if (this._state != undefined) {
            this._state.exit(next);
            previous = this._state;
        }
        this._state = this.states[next];
        this._state.enter(previous);
    }
    this.updateSate = function () {
        this._state.update();
    }
    return this;
}

export default StateManager; 