import * as actionTypes from "./weather-types";

export const addToList = (itemID) => {
    return {
        type: actionTypes.ADD_TO_LIST,
        payload: {
            id: itemID
        }
    }
}

export const removeFromList = (itemID) => {
    return {
        type: actionTypes.REMOVE_FROM_LIST,
        payload: {
            id: itemID
        }
    }
}