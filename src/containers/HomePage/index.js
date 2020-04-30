import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
class HomePage extends Component {
    render() {
        const { classes } = this.props;
        return (<div className={classes.root}>HomePage</div>);
    }
}

HomePage.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(HomePage);
