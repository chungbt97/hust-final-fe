import { Avatar, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import logo from '../../assets/images/logo.png';
import styles from './styles';

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    handleProfileMenuOpen = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleProfileMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const { children, classes, auth } = this.props;
        const open = Boolean(this.state.anchorEl);
        const display = auth === null ? true : false;
        return (
            <div>
                {display && (
                    <AppBar position="static" className={classes.bgWhite}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                            >
                                <Avatar alt="logo" src={logo} />
                            </IconButton>
                            <Typography component="div">
                                <Box
                                    fontFamily="Montserrat"
                                    textAlign="top"
                                    ml={2}
                                    fontWeight="fontWeightLight"
                                    fontSize={16}
                                >
                                    Final project - Soict
                                </Box>
                            </Typography>
                            <div className={classes.grow} />
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="default"
                                    //
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleProfileMenuClose}
                                >
                                    <MenuItem
                                        onClick={this.handleProfileMenuClose}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        onClick={this.handleProfileMenuClose}
                                    >
                                        My account
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                )}
                <div className={classes.wrapper}>
                    <div className={classes.wrapperContent}>{children}</div>
                </div>
            </div>
        );
    }
}

Lobby.propTypes = {
    children: PropTypes.object,
    classes: PropTypes.object,
};

export default withStyles(styles)(Lobby);
