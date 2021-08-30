import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddItem from "./AddItem";
import Cashier from "./Cashier";
import Login from "./Login";
import ItemList from "./ItemList";
import History from "./History";
import NotFound from "./NotFound";
import "./style.css";

export default function Root() {

    return (
        <div>
            <main>
                <Switch>
                    <Route path="/" exact component={Cashier}></Route>
                    <Route path="/add-item" component={AddItem}></Route>
                    <Route path="/item-list" component={ItemList}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/history" component={History}></Route>
                    <Route path="/" component={NotFound}></Route>
                </Switch>
            </main>

        </div>
    )

}