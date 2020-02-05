import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles } from '@material-ui/styles';

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    shouldComponentUpdate(nextProps, nextState) {}

    componentWillUpdate(nextProps, nextState) {}

    componentDidUpdate(prevProps, prevState) {}

    componentWillUnmount() {}

    render() {
        const {classes} = this.props
        return (
            <div className={classes.sidebar}>
                <h1>Sidebar nè ba</h1>
            </div>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(SideBar);
