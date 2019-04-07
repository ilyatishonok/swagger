import React from 'react';
import styled from 'styled-components';
import LoginForm from '../../login-form';

const Page = styled.div`
    display: flex;
    height: 100%;
`;

const LoginPage = () => (
    <Page>
        <LoginForm />
    </Page>
);

export default LoginPage;