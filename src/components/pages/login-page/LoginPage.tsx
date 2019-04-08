import React from 'react';
import styled from 'styled-components';
import LoginForm from 'components/login-form';

const Page = styled.div`
    display: flex;
    margin-top: 5rem;
    
    @media (max-width: 500px) {
        height: 25rem;   
    }
`;

const LoginPage = () => (
    <Page>
        <LoginForm />
    </Page>
);

export default LoginPage;
