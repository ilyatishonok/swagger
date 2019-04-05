import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from '../header';
import LoginPage from '../pages/login-page';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    #root {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`;

const theme = {
    main: '#7ed321',
    primary: '#e990f9',
};

const App = () => (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <GlobalStyle />
            <Header isAuthenticated />
            <LoginPage />
        </React.Fragment>
    </ThemeProvider>
);

export default App;