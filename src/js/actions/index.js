import { CHANGE_LANGUAGE, TOGGLE_MUTE } from './action-types';

export const changeLanguage = (newLanguage) => ({
    type: CHANGE_LANGUAGE,
    payload: newLanguage
});

export const toggleMute = () => ({
    type: TOGGLE_MUTE
});