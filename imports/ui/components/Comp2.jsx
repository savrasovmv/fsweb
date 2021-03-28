import React, { useEffect, useState } from 'react';
import { store } from '../Page'
import {setStatusOffline} from '../app/actions'

export const Comp2 = () => {
    const [status, setStatus] = useState('offline')

    useEffect(()=>{
        store.subscribe(() => {
            setStatus(store.getState())
        })

    },[])
    
    const handleStatus = ()=>{
        store.dispatch(setStatusOffline())
      }
    return (
        <React.Fragment>
            <div>{status}</div>
            <p></p>
            <button onClick={handleStatus}> Set Status offline</button>
        </React.Fragment>
    );
}