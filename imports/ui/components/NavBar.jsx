import React, { Fragment } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useStyles } from '../Page'
export const NavBar = () => {
    const classes = useStyles()
    const handleLogOut = () => Meteor.logout()
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" edge="end">
                    FreeSWITCH
                </Typography>
                {/* <Button edge="end" color="inherit">
                    Login
                </Button> */}
                <Button edge="end" color="inherit" onClick={handleLogOut}>
                    LogOUT
                </Button>
            </Toolbar>
        </AppBar>
    )
}
