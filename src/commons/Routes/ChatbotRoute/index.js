import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard';
import LoginPage from '../../../containers/SignIn';
import PropTypes from 'prop-types';

class ChatbotRoute extends Component {
    render() {
        const {
            name,
            match,
            component: ComponentRender,
            ...remainProps
        } = this.props;
        let token = localStorage.getItem('token');

        return (
            <Route
                {...remainProps}
                component={props => {
                    if (token !== null) {
                        return (
                            <Dashboard {...props} {...remainProps}>
                                <ComponentRender {...props} />
                            </Dashboard>
                        );
                    } else {
                        return <LoginPage {...remainProps} />;
                    }
                }}
            />
        );
    }
}
ChatbotRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
export default ChatbotRoute;
