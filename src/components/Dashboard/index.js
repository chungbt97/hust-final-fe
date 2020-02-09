import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import SideBar from './SideBar';
import Topbar from './Topbar';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as uiActions from '../../actions/ui';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    handleToggleSidebar = () => {
        const { uiActionCreators, open } = this.props;
        const { showSidebar, hideSidebar } = uiActionCreators;
        if (!open) {
            showSidebar();
        } else {
            hideSidebar();
        }
    };

    render() {
        const { children, classes, open } = this.props;
        return (
            <div>
                <Topbar handleToggleSidebar={this.handleToggleSidebar} />
                <div className={classes.wrapper}>
                    <SideBar
                        displaySidebar={open}
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
    uiActionCreators: PropTypes.shape({
        showSidebar: PropTypes.func,
        hideSidebar: PropTypes.func,
    }),
};

const mapStateToProps = state => {
    return {
        open: state.ui.sidbarOpen,
    };
};
const mapDispatchToProps = dispatch => ({
    uiActionCreators: bindActionCreators(uiActions, dispatch),
});

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), connectRedux)(Dashboard);
