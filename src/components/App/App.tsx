import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import history from '../../history';
import store from '../../store';
import Routes from '../routes';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    #root {
        display: flex;
        flex-direction: column;
    }
`;

const theme = {
    main: '#7ed321',
    primary: '#e990f9',
};

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <GlobalStyle />
                <Router history={history}>
                    <Routes />
                </Router>
            </React.Fragment>
        </ThemeProvider>
    </Provider>
);

export default App;