import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles } from '@material-ui/core';

class ImageExam extends Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>Image</div>;
    }
}

ImageExam.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ImageExam);
