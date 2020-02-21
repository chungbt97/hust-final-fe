import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Lobby from '../../../components/Lobby';

class DefaultRoute extends Component {
    static propTypes = {};

    render() {
        const { name, component: ComponentRender, ...remainProps } = this.props;
        return (
            <Route
                {...remainProps}
                render={routeProps => {
                    return (
                        <Lobby>
                            <ComponentRender {...remainProps} />
                        </Lobby>
                    );;
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
