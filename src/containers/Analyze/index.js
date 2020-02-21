import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

class Analyze extends Component {
    render() {
        const {classes} = this.props;
        return <div className={classes.root}>Anivia</div>;
    }
}

Analyze.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Analyze);
