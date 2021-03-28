import {SET_STATUS_ONLINE, SET_STATUS_OFFLINE} from './types'

export const setStatusOnline = () => {
    return {
        type: SET_STATUS_ONLINE
    }
};


export const setStatusOffline = () => {
    return {
        type: SET_STATUS_OFFLINE
    }
};
