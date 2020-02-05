import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChatbotRoute from '../../components/ChatbotRoute';
import { DASHBROAD_ROUTES } from '../../constants';
import configStore from '../../redux/configStore';
import {outerTheme} from '../../commons/Theme/themes';
import HomePage from '../HomePage';
import Rules from '../Rules';

const store = configStore();

class App extends Component {
    /**
     * List danh sách route
     */
    renderDashbroadRoute = () => {
        let xhtml = null;
        xhtml = DASHBROAD_ROUTES.map((route, index) => {
            let {path, exact, component, name} = route;
            return <ChatbotRoute key={index}  path={path} exact={exact} component={component} name={name} />;
        });
        console.log(xhtml);
        return xhtml;
    };
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={outerTheme}>
                        {/* modal thông báo */}
                        <Switch>
                            {this.renderDashbroadRoute()}
                        </Switch>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
