import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { AppBar, Toolbar , IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from '../Page'
export const NavBar = () => {

    const classes = useStyles();
    return (
        
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            
            <Typography variant="h6" edge="end">
                FreeSWITCH
            </Typography>
                <Button edge="end" color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        
    )
}