import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard';
import PropTypes from 'prop-types';

class ChatbotRoute extends Component {
    static propTypes = {};

    render() {
        const {name, component: ComponentRender, ...remainProps} = this.props;
        return (
            <Route {...remainProps} 
                render = {routeProps => {
                    return (
                        <Dashboard>
                            <ComponentRender {...remainProps} />
                        </Dashboard>
                    );
                }
                }/> 
        );
    }
}
ChatbotRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
export default ChatbotRoute;