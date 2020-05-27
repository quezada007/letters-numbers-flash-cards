import { combineReducers } from 'redux';
import { CHANGE_LANGUAGE, TOGGLE_MUTE } from '../actions/action-types';

const initialState = {
    currentLanguage: 'english',
    isMuted: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_LANGUAGE:
        return {
            ...state,
            currentLanguage: action.payload
        };
    case TOGGLE_MUTE:
        return {
            ...state,
            isMuted: !state.isMuted
        };
    default:
        return state;
    }
};

export default combineReducers({
    controls: reducer
});