import * as actionTypes from "./weather-types";

const INITIAL_STATE = {
    data: [],
    currentIten: null
}

const weatherReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_LIST:
            return {}
        case actionTypes.REMOVE_FROM_LIST:
            return {}
        default:
            return state
    }
}

export default weatherReducer;