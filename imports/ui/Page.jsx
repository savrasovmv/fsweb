import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, Toolbar , IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {NavBar} from './components/NavBar'
import {SideBar} from './components/SideBar'
import {Home } from './pages/Home'
import {DirectoryList } from './pages/DirectoryList'
import {Directory } from './pages/Directory'
import {ContactsList} from './pages/ContactsList'

const drawerWidth = 240;

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      }
      
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        //width: `calc(100% - ${drawerWidth}px)`,
        width: '100%',
        //marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export const Page = () => {
  const classes = useStyles();
  const theme = useTheme();

  // const api_regex = /^\/api\/.*/

  // if (!api_regex.test(window.location.pathname)) {
    console.log(window.location.pathname)

    return (
      <Router>
        
        <div className={classes.root}>
        <CssBaseline />

        
        
        
        
        
        <NavBar/>
          
          <SideBar/>
        
        
          
          <main className={classes.content}>
          <div className={classes.toolbar} />
          
          <Switch>
            
            
            <Route path="/contacts">
              <ContactsList />
            </Route>
            <Route path="/directory::id">
              <Directory />
            </Route>
            <Route path="/directory">
              <DirectoryList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          
          </main>
        </div>
        
      </Router>
    );
    // }

}