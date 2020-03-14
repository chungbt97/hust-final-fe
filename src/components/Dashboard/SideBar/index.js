import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
import { DASHBOARD_ROUTES } from '../../../constants';
import {
    List,
    Icon,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
class SideBar extends Component {
    toggleDrawer = value => event => {
        const { handleToggleSidebar } = this.props;
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        handleToggleSidebar(value);
    };

    renderMenuList = () => {
        let xhtml = null;
        const { classes, match } = this.props;
        let { id } = match.params;
        xhtml = (
            <List>
                {DASHBOARD_ROUTES.map((route, index) => (
                    <NavLink
                        key={index}
                        to={`${route.path}/${id}`}
                        exact={route.exact}
                        className={classes.menuLink}
                        activeClassName={classes.activedMenuLink}
                    >
                        <ListItem button>
                            <ListItemIcon className={classes.menuIcon}>
                                <Icon fontSize="default">{route.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText
                                primary={route.name}
                                disableTypography={true}
                                className={classes.menuText}
                            />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        );
        return xhtml;
    };
    render() {
        const { classes, displaySidebar } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={displaySidebar}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {this.renderMenuList()}
            </Drawer>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object,
    displaySidebar: PropTypes.bool,
    match: PropTypes.object,
};

export default withStyles(styles)(SideBar);
