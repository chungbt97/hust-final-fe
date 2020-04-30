import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatbotRoute from '../../commons/Routes/ChatbotRoute';
import DefaultRoute from '../../commons/Routes/DefaultRoute';
import { outerTheme } from '../../commons/Theme/themes';
import { DASHBOARD_ROUTES, LOBBY_ROUTES, URL_BOT } from '../../constants';
import configStore from '../../redux/configStore';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import history from './history';

const store = configStore();

class App extends Component {
    /**
     * List danh sách route
     */
    renderDashboardRoutes = () => {
        let xhtml = null;
        xhtml = DASHBOARD_ROUTES.map((route, index) => {
            let { path, exact, component, name } = route;
            return (
                <ChatbotRoute
                    key={index}
                    path={`${path}/${URL_BOT}/:botId`}
                    exact={exact}
                    component={component}
                    name={name}
                />
            );
        });
        return xhtml;
    };

    renderLobbyRoutes = () => {
        let xhtml = null;
        xhtml = LOBBY_ROUTES.map((route, index) => {
            let { path, exact, component, name, auth } = route;
            return (
                <DefaultRoute
                    key={index}
                    path={path}
                    exact={exact}
                    component={component}
                    name={name}
                    auth={auth}
                />
            );
        });
        return xhtml;
    };

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <ThemeProvider theme={outerTheme}>
                        <CssBaseline />
                        <ToastContainer />
                        {/* modal thông báo */}

                        <Switch>
                            {this.renderDashboardRoutes()}
                            {this.renderLobbyRoutes()}
                            <Route path='/sign-up' component={SignUp}/>
                            <Route path='/sign-in' component={SignIn}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </ThemeProvider>
                </Router>
            </Provider>
        );
    }
}

export default App;
