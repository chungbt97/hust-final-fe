import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
class DashBoardBot extends Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.root}>Nội dung của mỗi 1 anh bot</div>;
    }
}

DashBoardBot.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(DashBoardBot);
