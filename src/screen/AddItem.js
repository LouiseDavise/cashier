import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { logout, uploadImage, addImage, addItem } from '../api/index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { LaptopWindowsTwoTone } from '@material-ui/icons';

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
    form: {
        padding: '50px 100px',
        boxSizing: 'border-box',
    },
    input: {
        margin: '10px 0px'
    },
}));
export default function History() {
    const classes = useStyles();
    const [itemName, setItemName] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState(false);

    const onLogout = () => {
        logout();
        console.log('Logout')
    }

    const onItemNameChange = (event) => {
        setItemName(event.target.value.toString());
    };

    const onSelectedChange = (event) => {
        setSelectedItem(event.target.value.toString());
    };

    const onPriceChange = (event) => {
        setPrice(event.target.value);
    };

    const onUploadImage = (e) => {
        console.log(e.target.files);
        setImage(e.target.files[0])
    }

    const onSubmit = () => {
        if (image) {
            uploadImage(image).then((url) => {
                addImage({
                    name: image.name,
                    size: image.size,
                    type: image.type,
                    url,
                    UUID: uuidv4(),
                })
                    .then(() => { })
                    .catch((err) => console.log(err))
                const date = new Date().toString();
                addItem({
                    name: itemName,
                    image: url,
                    type: selectedItem,
                    price,
                    date
                }).then(() => {
                    window.location.href= '/item-list';
                })
            })
        }
        else {
            setErrMessage(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} className={classes.gridLeft}>
                    <nav className={classes.nav}>
                        <Link to="/cashier" className={classes.link}>Cashier</Link>
                        <Link to="/add-item" className={classes.link}>Add Item</Link>
                        <Link to="/history" className={classes.link}>History</Link>
                        <Link to="/item-list" className={classes.link}>Item List</Link>
                        <Button variant="outlined" className={classes.logout} size="small" onClick={onLogout}>Log out</Button>
                    </nav>
                    <div className={classes.datas}>
                        <div className={classes.form} noValidate autoComplete="off">
                            <TextField label="Item Name" onChange={onItemNameChange} fullWidth className={classes.input} />
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={selectedItem}
                                    onChange={onSelectedChange}
                                >
                                    <MenuItem value={"phone"}>Phone</MenuItem>
                                    <MenuItem value={"laptop"}>Laptop</MenuItem>
                                    <MenuItem value={"desktop"}>Desktop</MenuItem>
                                    <MenuItem value={"accessories"}>Accessories</MenuItem>
                                    <MenuItem value={"other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField type="number" onChange={onPriceChange} label="Price" fullWidth className={classes.input} />
                            <input type="file" placeholder="Price" class="custom-file-input" onChange={onUploadImage} />
                            <br />
                            <div className={classes.err} style={{ display: `${errMessage == true ? 'inline-flex' : 'none'}` }}>
                                <ErrorOutline fontSize="small" />
                                <p>&nbsp;Login failed. Check your email or password.</p>
                            </div>
                            <Button onClick={onSubmit} type="submit" variant="contained" color="primary" className={classes.input}>Add</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}