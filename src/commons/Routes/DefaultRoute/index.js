import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Lobby from '../../../components/Lobby';
import LoginPage from '../../../containers/SignIn';

class DefaultRoute extends Component {
    static propTypes = {};

    render() {
        const {
            name,
            auth,
            match,
            component: ComponentRender,
            ...remainProps
        } = this.props;
        let token = localStorage.getItem('token');

        return (
            <Route
                {...remainProps}
                render={routeProps => {
                    if (token !== null) {
                        return (
                            <Lobby auth={auth} {...routeProps} {...remainProps}>
                                <ComponentRender {...remainProps} {...routeProps}/>
                            </Lobby>
                        );
                    } else {
                        return <LoginPage {...remainProps} />;
                    }
                }}
            />
        );
    }
}
DefaultRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
export default DefaultRoute;
