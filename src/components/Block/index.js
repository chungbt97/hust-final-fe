import { withStyles, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as actionCommon from '../../commons/Method';
import { MAX_LENGTH_BLOCK_NAME } from '../../constants';
import styles from './styles';

class Block extends Component {
    render() {
        const { classes, title } = this.props;
        let titleSplit =
            title.length > MAX_LENGTH_BLOCK_NAME
                ? actionCommon.splitName(title, MAX_LENGTH_BLOCK_NAME)
                : title;
        return <Paper className={classes.paper}>{titleSplit}</Paper>;
    }
}

Block.propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
};

export default withStyles(styles)(Block);
