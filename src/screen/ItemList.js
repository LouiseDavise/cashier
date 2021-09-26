import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MUIData from "mui-datatables";

import { logout, onUserChanged, getItem } from '../api/index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


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
    datas:{
        maxWidth: '100vw',
        height: '100%',
        padding: '50px 100px',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    mui:{
    }
}));
export default function History() {
    const [item, setItem] = useState([]);
    const [activeImage, setActiveImage] = useState(null);
    const [showImageDlg, setShowImageDlg] = useState(false);

    const columns = [
        {
            name: 'name',
            label: 'Name'
        },
        {
            name: 'image',
            label: 'Image',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, meta) => {
                    console.log('filename = ', meta.rowData[1])
                    return <img src={value} style={{ maxHeight: '80px' }}
                        onClick={() => onClickImage(meta.rowData[1], value)} />
                }
            }
        },
        {
            name: 'type',
            label: 'Type'
        },
        {
            name: 'price',
            label: 'Price',
            options: {
                customBodyRender: (value) => {
                    return (
                        <div>
                            Rp {value}
                        </div>
                    )
                }
            }
        },
        {
            name: 'date',
            label: 'Date Added',
        },
        {
            name: 'id',
            label: 'Action',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value) => {
                    return (
                        <div>
                            <Button onClick={(e) => onEditFile(value)}>Edit</Button>
                            <Button onClick={(e) => onDeleteFile(value)}>Delete</Button>
                        </div>
                    )
                }
            }
        }
    ]

    const classes = useStyles();

    const onLogout = () => {
        logout();
        console.log('Logout')
    }

    useEffect(() => {
        loadItem();
    }, [])

    const loadItem = () => {
        getItem().then((item) => {
            setItem(item);
        })
    }

    const onEditFile = () => {
        console.log('onEditFile')
    }

    const onDeleteFile = (id) => {
        
        onDeleteFile(id).then(() => {
            loadItem();
        })
    }

    const onClickImage = (item, url) => {
        setActiveImage({ item, url });
        setShowImageDlg(true);
    }

    const onCloseImageDlg = () => {
        setShowImageDlg(false);
    }

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
                        <MUIData
                            columns={columns}
                            data={item}
                            className={classes.mui}
                        >
                        </MUIData>
                        <Dialog open={showImageDlg} onClose={onCloseImageDlg} fullWidth maxWidth="md">
                            <DialogTitle>{activeImage && activeImage.filename}</DialogTitle>
                            <DialogContent>
                                {
                                    activeImage && (
                                        <img src={activeImage.url} style={{ maxWidth: '100%', maxHeight: '100%' }}></img>
                                    )
                                }
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onCloseImageDlg} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}