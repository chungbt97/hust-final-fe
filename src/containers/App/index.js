import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import ChatbotRoute from '../../commons/Routes/ChatbotRoute';
import DefaultRoute from '../../commons/Routes/DefaultRoute';
import { outerTheme } from '../../commons/Theme/themes';
import { DASHBOARD_ROUTES, LOBBY_ROUTES } from '../../constants';
import configStore from '../../redux/configStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    path={path}
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
            let { path, exact, component, name } = route;
            return (
                <DefaultRoute
                    key={index}
                    path={path}
                    exact={exact}
                    component={component}
                    name={name}
                />
            );
        });
        return xhtml;
    };

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={outerTheme}>
                        <CssBaseline />
                        <ToastContainer />
                        {/* modal thông báo */}
                        <Switch>
                            {this.renderDashboardRoutes()}
                            {this.renderLobbyRoutes()}
                        </Switch>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
