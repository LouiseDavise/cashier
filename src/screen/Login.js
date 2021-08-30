import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// Material UI import
import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles((theme) => ({
    color:{
        backgroundColor:"pink"
    }
}))
export default function Login() {
    const classes = useStyle();

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={7} className={classes.color}>

                </Grid>
                <Grid item xs={5}>
                    Text
                </Grid>
            </Grid>
        </div>
    )
}