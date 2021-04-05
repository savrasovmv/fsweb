import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';


export const ContactsList = () => {

    const handleClick = () => {
        console.log('Click Connect')
        
    }

    return (
        <React.Fragment>
            <h1>Контакты</h1>
            <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClick}
          >
            Connect
          </Button>
            
          
        </React.Fragment>
    );
}