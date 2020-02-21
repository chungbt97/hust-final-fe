import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SideBar from './SideBar';
import styles from './styles';
import Topbar from './Topbar';

class Dashboard extends Component {
    render() {
        const { children, classes} = this.props;
        return (
            <div>
                <Topbar handleToggleSidebar={this.handleToggleSidebar} />
                <div className={classes.wrapper}>
                    <SideBar
                        displaySidebar={true}
                        handleToggleSidebar={this.handleToggleSidebar}
                    />
                    <div className={classes.wrapperContent}>{children}</div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.object,
    classes: PropTypes.object,
};


export default withStyles(styles)(Dashboard);
