import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from './styles';
class ContentBlock extends Component {
    render() {
        const { classes, match } = this.props;
        // console.log(this.props);
        const { idBlock } = match.params;
        return <div className={classes.root}> --- > {idBlock}</div>;
    }
}

ContentBlock.propTypes = {
    classes: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        state,
    };
};
const mapDispatchToProps = dispatch => {
    return {};
};
const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(ContentBlock);
