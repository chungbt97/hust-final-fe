import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as modalActions from '../../../actions/modal';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

let FORM_NAME = 'BOT';
class BotForm extends Component {
    render() {
        const { children } = this.props;
        return <div>{React.cloneElement(children, { ...this.props })}</div>;
    }
}

BotForm.propTypes = {
    children: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        initialValues: state.bot.botEdit,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        modalActionCreators: bindActionCreators(modalActions, dispatch),
    };
};

const connectReduxFrom = reduxForm({
    form: FORM_NAME,
});

const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(connectRedux, connectReduxFrom)(BotForm);
