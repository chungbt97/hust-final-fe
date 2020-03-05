import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListBlock from '../../../components/ListBlock';

class BlockRoute extends Component {

    render() {
        const {name, component: ComponentRender, ...remainProps} = this.props;
        return (
            <Route {...remainProps}
                render = {routeProps => {
                    return (
                        <ListBlock>
                            <h1> Bot </h1>
                        </ListBlock>
                    );
                }
                }/>
        );
    }
}
BlockRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
export default BlockRoute;
