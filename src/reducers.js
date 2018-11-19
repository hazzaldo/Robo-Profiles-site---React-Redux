import { CHANGE_SEARCH_FIELD } from "./constants";

//Here we need to define the initial state of the app.
const initialState = {
    searchField: ''
}

export const searchRobots = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
        //if the action type is the one that this reducer expects, then return a new state that has the initial state along with the state to be modified. In this case searchField.
            return Object.assign({}, state, {searchField: action.payload});
            //another cleaner way of writing the line above is: return { ...state, searchField: action.payload}
        default:
            return state;

    }
}