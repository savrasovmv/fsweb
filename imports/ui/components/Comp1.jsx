import React, { useState, useEffect } from 'react';

import { store } from '../Page'
import {SET_STATUS_ONLINE, SET_STATUS_OFFLINE} from '../app/types'
import {setStatusOnline} from '../app/actions'



export const Comp1 = () => {

    const [status, setStatus] = useState('offline')
  
    useEffect(()=>{
        console.log('STATUS', store.getState())
        store.subscribe(() => {
            setStatus(store.getState())
        })

    },[])
    const handleStatus = ()=>{
        console.log(setStatusOnline())
        store.dispatch(setStatusOnline())
      }
    return (
        <React.Fragment>
            <div>{status}</div>
            <p></p>
            <button onClick={handleStatus}> Set Status online</button>
        </React.Fragment>
    );
}