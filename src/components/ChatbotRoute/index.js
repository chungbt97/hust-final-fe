import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DashBroad from '../Dashbroad';
import PropTypes from 'prop-types';

class ChatbotRoute extends Component {
    static propTypes = {};

    render() {
        const {name, component: ComponentRender, ...remainProps} = this.props;
        console.log(remainProps);
        return (
            <Route {...remainProps} 
                render = {routeProps => {
                    return (
                        <DashBroad>
                            <ComponentRender {...remainProps} />
                        </DashBroad>
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