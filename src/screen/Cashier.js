import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { logout, onUserChanged } from '../api/index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Image1 from '../image/macbookpro19jt.png';
import Image2 from '../image/Ipadair8jt.png';

const useStyles = makeStyles((theme) => ({
    p: {
        fontSize: "20px",
    },
    gridLeft: {
        maxHeight: '100vh',
        backgroundColor: "#ffffff",
    },
    gridRight: {
        height: '100vh',
        backgroundColor: '#fBfBfB',
        padding: '0px 0px',
        overflowX: 'none',
        position: 'relative'
    },
    nav: {
        height: '8vh',
        maxWidth: '100%',
        boxShadow: '0px 0px 10px 1px grey',
        lineHeight: '55px',
        padding: '0px 50px',
    },
    logout: {
        float: 'right',
        marginTop: '13px',
    },
    link: {
        paddingRight: '20px',
        textDecoration: 'none',
        color: '#747474',
        '&:hover': {
            color: 'black'
        }
    },
    order: {
        height: '55px',
        lineHeight: '55px'
    },
    orderTitle: {
        textAlign: 'center',
        fontSize: '17px',
        borderBottom: '0.5px solid #ECECEC'
    },
    items: {
        marginTop: '10px',
        maxWidth: '100%',
        maxHeight: '81vh',
        overflowY: 'auto',
        padding: '30px 70px',
        paddingRight: '0px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    orderedItems: {
        maxWidth: '100%',
        maxHeight: '81vh',
        overflowY: 'auto',
        padding: '20px 0px',
        paddingRight: '0px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    item: {
        width: '130px',
        height: '130px',
        transition: '0.2s',
        borderRadius: '10px',
        backgroundColor: 'white',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        margin: '10px 20px',
        marginLeft: '0px',
        overflow: 'none',
        zIndex: '1',
        '&:hover': {
            boxShadow: '0px 0px 5px 1px lightgrey'
        }
    },
    orderedItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItem: 'center',
        flexDirection: 'row',
        padding: '15px 20px',
        // paddingRight: '10px',
        width: '100%',
        height: '80px',
        transition: '0.2s',
        borderRadius: '10px',
        backgroundColor: 'white',
        outline: 'none',
        border: '2px solid white',
        cursor: 'pointer',
        margin: '5px 20px',
        marginLeft: '20px',
        overflow: 'none',
        zIndex: '1',
        transition: '0.5s',
        '&:hover': {
            // boxShadow: '0px 0px 5px 1px lightgrey'
            border: '2px solid #E7E7E7'
        }
    },
    itemImageContainer: {
        width: '80px',
        height: 'auto',
    },
    itemImage: {
        width: 'auto',
        height: '50px',
    },
    orderedItemImage: {
        width: 'auto',
        height: '50px',
    },
    itemName: {
        margin: '5px 10px 0px 10px',
        fontSize: '14px',
        color: '#515151',
    },
    itemPrice: {
        margin: '0px 5px',
        fontSize: '11.5px',
        color: 'grey',
    },
    orderedItemName: {
        margin: '5px 20px',
        fontSize: '14px',
        color: '#515151',
        textAlign: 'left',
    },
    orderedItemPrice: {
        margin: '5px 20px',
        fontSize: '11.5px',
        color: 'grey',
        textAlign: 'left',
    },
    search: {
        marginTop: '10px',
        position: 'relative',
        float: 'right',
        height: '30px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        borderRadius: theme.shape.borderRadius,
        border: "2px solid #F4F3FF",
        '&:hover': {
            backgroundColor: "#F4F3FF",
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'grey'
    },
    inputInput: {
        marginTop: '-10px',
        color: 'grey',
        padding: theme.spacing(1, 1, 0, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    totalPrice: {
        width: '100%',
        height: '80px',
        position: 'fixed',
        bottom: 0,
        zIndex: '1',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px 25px',
        fontWeight: 'bold',
        fontSize: '16px',
        borderTop: '2px solid lightgrey'
    },
    totalPriceValue: {
        fontWeight: 'normal',
    }
}))

export default function Cashier() {
    const classes = useStyles();

    useEffect(() => {
        onUserChanged((user) => {
            if (user) {
                // If login already, redirect to dashboard ?
                if (window.location.pathname === '/') {
                    window.location.href = '/cashier';
                }
            }
            else {
                if (window.location.pathname.toLowerCase() !== '/' &&
                    window.location.pathname.toLowerCase() !== '/login') {
                    window.location.href = '/'
                }
            }
        })
    },[])

    const onLogout = () => {
        logout();
        console.log('Logout')
    }
    return (
        <div>
            <Grid container>
                <Grid item xs={9} className={classes.gridLeft}>
                    <nav className={classes.nav}>
                        <Link to="/cashier" className={classes.link}>Cashier</Link>
                        <Link to="/add-item" className={classes.link}>Add Item</Link>
                        <Link to="/history" className={classes.link}>History</Link>
                        <Link to="/item-list" className={classes.link}>Item List</Link>
                        <Button variant="outlined" className={classes.logout} size="small" onClick={onLogout}>Log out</Button>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    input: classes.inputInput,
                                }}
                                size="small"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </nav>
                    <div className={classes.items}>
                        <button className={classes.item}>
                            <img src={Image1} className={classes.itemImage}></img>
                            <p className={classes.itemName}>Macbook Pro</p>
                            <p className={classes.itemPrice}>IDR 18,500,000</p>
                        </button>
                        <button className={classes.item}>
                            <img src={Image2} className={classes.itemImage}></img>
                            <p className={classes.itemName}>Ipad Air</p>
                            <p className={classes.itemPrice}>IDR 8,300,000</p>
                        </button>
                    </div>
                </Grid>

                <Grid item xs={3} className={classes.gridRight}>
                    <div className={classes.order}>
                        <p className={classes.orderTitle}>Order</p>
                    </div>
                    <div className={classes.orderedItems}>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image1} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Macbook Pro</p>
                                <p className={classes.orderedItemPrice}>IDR 18,500,000</p>
                            </div>
                        </button>
                        <button className={classes.orderedItem}>
                            <div className={classes.itemImageContainer}>
                                <img src={Image2} className={classes.itemImage}></img>
                            </div>
                            <div>
                                <p className={classes.orderedItemName}>Ipad Air</p>
                                <p className={classes.orderedItemPrice}>IDR 8,300,000</p>
                            </div>
                        </button>
                        <div className={classes.totalPrice}>
                            <p>Total price : &nbsp;</p>
                            <p className={classes.totalPriceValue}>IDR 26,800,000</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )

}