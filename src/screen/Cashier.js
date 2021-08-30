import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    p: {
        fontSize: "20px"
    }
}))

export default function Cashier() {
    const classes = useStyles();

    return (
        <div>
            <p className={classes.p}>Cashier page</p>
        </div>
    )

}