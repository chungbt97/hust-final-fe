import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../../components/Dashboard';
import PropTypes from 'prop-types';

class ChatbotRoute extends Component {
    render() {
        const {name, match, component: ComponentRender, ...remainProps} = this.props;
        return (
            <Route {...remainProps}
                component = {props => {
                    return (
                        <Dashboard {...props} {...remainProps}>
                            <ComponentRender {...props} />
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
