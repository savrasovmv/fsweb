import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            // '& > * + *': {
            //     marginLeft: theme.spacing(2),
            // },
            flexDirection: 'column',
            alignItems: 'center',
            //margin: '45%',
        },
    })
)

export const Progress = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )
}
