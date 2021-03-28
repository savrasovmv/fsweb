import {SET_STATUS_ONLINE, SET_STATUS_OFFLINE} from './types'

export const reducer = (state, action) => {
    switch (action.type) {
      case SET_STATUS_ONLINE:
          return 'online';
      case SET_STATUS_OFFLINE:
          return 'offline'
      
    }
    return state;
  }