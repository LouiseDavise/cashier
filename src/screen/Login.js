import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Image from "../image/login-image.jpg"
import { login } from "../api/index";

// Material UI import
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';


const useStyle = makeStyles((theme) => ({
    gridLeft: {
        backgroundImage: `url(${Image})`,
        height: '100vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
    gridRight: {
        height: '100vh',
        padding: '0px 80px'
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
        margin: theme.spacing(0, 0, 2),
        background: "linear-gradient(45deg, rgba(12,1,193,1) 0%, rgba(0,212,255,1) 100%)"
    },
    name: {
        '&::after': {
            content: `""`,
            width: '200px',
            height: '5px',
            background: "linear-gradient(45deg, rgba(12,1,193,1) 0%, rgba(0,212,255,1) 100%)"
        }
    },
    err: {
        color: 'red',
        height: '30px',
        fontSize: '10px',
        lineHeight: '20px',
    },
    snackbar: {
        marginTop: '0px'
    },
    snackbar2: {
        marginTop: '50px'
    },
    snackbar3: {
        marginTop: '100px'
    },
}))

export default function Login() {
    const classes = useStyle();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(false);

    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
        Transition: Slide,
    });

    const { vertical, horizontal } = state;

    const onChangeName = (name) => {
        setName(name.target.value);
        console.log("Name changed => ", name.target.value)
    }

    const onChangeEmail = (email) => {
        setEmail(email.target.value);
        console.log("Email changed => ", email.target.value)
    }

    const onChangePassword = (password) => {
        setPassword(password.target.value);
        console.log("Password changed => ", password.target.value)
    }

    const onLogin = () => {
        login(name, email, password).then(() => {
            console.log("Loggin success")
            window.location.href = '/cashier'
        }).catch((err) => setErrMessage(err))
    }
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={7} className={classes.gridLeft}>
                </Grid>
                <Grid
                    container
                    xs={5}
                    className={classes.gridRight}
                    justifyContent="center"
                    alignItems="center"
                >
                    <div>
                        <Typography component="h1" variant="h5" className={classes.name}>
                            Sign in
                        </Typography>
                        <div className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="Admin Name"
                                name="email"
                                autoFocus
                                onChange={onChangeName}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                autoComplete="current-email"
                                onChange={onChangeEmail}
                            />
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={onChangePassword}
                            />
                            <div className={classes.err} style={{ display: `${errMessage == true ? 'inline-flex' : 'none'}` }}>
                                <ErrorOutline fontSize="small" />
                                <p>&nbsp;Login failed. Check your email or password.</p>
                            </div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onLogin}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Snackbar
                open={state.open}
                anchorOrigin={{ vertical, horizontal }}
                TransitionComponent={state.Transition}
                message="Name = Your Name"
                // key={state.Transition.name}
                className={classes.snackbar}
            />
            <Snackbar
                open={state.open}
                anchorOrigin={{ vertical, horizontal }}
                TransitionComponent={state.Transition}
                message="Email = admin@gmail.com"
                // key={state.Transition.name}
                className={classes.snackbar2}
            />
            <Snackbar
                open={state.open}
                anchorOrigin={{ vertical, horizontal }}
                TransitionComponent={state.Transition}
                message="Password = password"
                // key={state.Transition.name}
                className={classes.snackbar3}
            />

        </div>
    )
}