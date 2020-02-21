import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

class Rules extends Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>Rules</div>;
    }
}

Rules.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Rules);
