import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import history from '../../history';
import store from 'store';
import Routes from 'components/routes';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #root {
        box-sizing: inherit
        display: flex;
        flex-direction: column;
    }
`;

const theme = {
    main: '#7ed321',
    primary: '#e990f9',
    white: '#fffff',
    black: '#00000',
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
