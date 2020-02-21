import { Avatar, Box, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import logo from '../../../assets/images/logo.png';
import styles from './styles';

const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
        };
    }
    /**
     * mở menu web
     */
    handleProfileMenuOpen = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleMobileMenuClose = () => {
        this.setState({
            mobileMoreAnchorEl: null,
        });
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleMobileMenuOpen = e => {
        this.setState({
            mobileMoreAnchorEl: e.currentTarget,
        });
    };

    renderMenu = () => {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);

        let xhtml = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>
                    <SettingsIcon />
                    <Typography className={classes.menuItem}>
                        Setting
                    </Typography>
                </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                    <LogoutIcon />
                    <Typography className={classes.menuItem}>Logout</Typography>
                </MenuItem>
            </Menu>
        );
        return xhtml;
    };

    renderMobileMenu = () => {
        const { mobileMoreAnchorEl } = this.state;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        let xhtml = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton
                        aria-label="show 11 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <Avatar
                            alt="Cindy Baker"
                            src="https://i.pinimg.com/originals/a0/a2/62/a0a262062ff8d4ecf2ae305d25eea56d.jpg"
                        />
                    </IconButton>
                    <p>Chung Biện</p>
                </MenuItem>
            </Menu>
        );
        return xhtml;
    };
    /**
     * Đóng mở sidebar
     */
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.grow}>
                <AppBar position="static" className={classes.bgWhite}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            href="/"  
                        >
                            <Avatar alt="logo" src={logo} />
                        </IconButton>

                        <div>
                            <Avatar
                                alt="Cindy Baker"
                                src="https://i.pinimg.com/474x/ea/ba/8e/eaba8eb2c4abdaaa0076a132611f01b6.jpg"
                            />
                        </div>
                        <div>
                            <Typography component="div">
                                <Box
                                    fontFamily="Montserrat"
                                    textAlign="top"
                                    ml={2}
                                    fontWeight="fontWeightLight"
                                    fontSize={16}
                                >
                                    Phoan Plus
                                </Box>
                            </Typography>
                            <Typography component="div">
                                <Box
                                    fontFamily="Montserrat"
                                    textAlign="top"
                                    fontWeight="fontWeightLight"
                                    ml={2}
                                    fontSize={12}
                                >
                                    chungch251997@gmail.com
                                </Box>
                            </Typography>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <Button
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                                className={classes.iconButton}
                            >
                                <Avatar
                                    alt="Cindy Baker"
                                    src="https://i.pinimg.com/originals/a0/a2/62/a0a262062ff8d4ecf2ae305d25eea56d.jpg"
                                />
                                <Typography component="div">
                                    <Box
                                        fontFamily="Montserrat"
                                        textAlign="center"
                                        m={1}
                                        fontWeight="fontWeightLight"
                                        fontSize="fontSize"
                                    >
                                        Chung Biện
                                    </Box>
                                </Typography>
                            </Button>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.renderMobileMenu()}
                {this.renderMenu()}
            </div>
        );
    }
}

Topbar.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Topbar);
