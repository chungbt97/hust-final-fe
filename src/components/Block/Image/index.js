import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles } from '@material-ui/core';

class ImageExam extends Component {
    render() {
        return(
            <Grid item sm={8}>
                <Paper elevation={3}>
                    in
                </Paper>
            </Grid>
        );
    }
}

ImageExam.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ImageExam);
