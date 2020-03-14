import { withStyles, Paper, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as actionCommon from '../../commons/Method';
import { MAX_LENGTH_BLOCK_NAME } from '../../constants';
import styles from './styles';

class Block extends Component {
    renderTitle = () => {
        const { title, classes } = this.props;
        let xhtml = null;
        if (title === null) {
            xhtml = <Icon className={classes.iconAddButton}>add_icon</Icon>;
        } else {
            let titleEdit =
                title.length > MAX_LENGTH_BLOCK_NAME
                    ? actionCommon.splitName(title, MAX_LENGTH_BLOCK_NAME)
                    : title;
            xhtml = <div className={classes.stringTitle}> {titleEdit}</div>;
        }
        return xhtml;
    };

    render() {
        const { classes } = this.props;
        return <Paper className={classes.paper}>{this.renderTitle()}</Paper>;
    }
}

Block.propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
};

export default withStyles(styles)(Block);
