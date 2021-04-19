import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// export const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const submit = e => {
//     e.preventDefault();

//     Meteor.loginWithPassword(username, password);
//   };

//   return (
//     <form onSubmit={submit} className="login-form">
//       <label htmlFor="username">Username</label>

//       <input
//         type="text"
//         placeholder="Username"
//         name="username"
//         required
//         onChange={e => setUsername(e.target.value)}
//       />

//       <label htmlFor="password">Password</label>

//       <input
//         type="password"
//         placeholder="Password"
//         name="password"
//         required
//         onChange={e => setPassword(e.target.value)}
//       />

//       <button type="submit">Log In</button>
//     </form>
//   );
// };

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const schema = yup.object().shape({
    name: yup.string().required().min(3, 'Минимум 3 символа'),
    number: yup.string().required().min(3, 'Минимум 3 символа'),
})

const FormField = ({ name, errors, register }) => {
    return (
        <Box>
            <input
                type="text"
                ref={register}
                id={name}
                label={name}
                name={name}
            />
            {errors[name] && (
                <font color="red">
                    {errors[name].message}
                    <br />
                </font>
            )}
        </Box>
    )
}

export const LoginForm = () => {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e) => {
        e.preventDefault()

        Meteor.loginWithPassword(username, password)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Login</td>
                                <td>
                                    <input
                                        type="text"
                                        //ref={register}
                                        name="username"
                                        id="username"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input
                                        type="password"
                                        //ref={register}
                                        name="password"
                                        id="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    /> */}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}
