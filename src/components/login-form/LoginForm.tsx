import React from 'react';
import styled, { keyframes } from 'styled-components';
import bearIcon from './bear.svg';
import BearIcon from './icons/BearIcon';

export interface LoginFormProps {
    isLoading: boolean;
    login: () => void;
}

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    padding-top: 4rem;
    padding-right: 7rem;
    padding-left: 7rem;
    padding-bottom: 2rem;
    border-radius: 1.2rem;
    background-color: ${ props => props.theme.primary };

    @media (max-width: 500px) {
        margin: 0;
        width: 100%;
        padding: 0;
        background-color: white;
        align-items: center;
        justify-content: space-around;
    }
`;

const LetMeInButton = styled.button`
    margin-top: 3rem;
    background-color: transparent;
    border-radius: 1.5rem;
    cursor: pointer;
    padding: 0.7rem;
    color: white;
    border: 0.2rem solid white;

    @media (max-width: 500px) {
        width: 90%;
        color: ${ props => props.theme.primary }
        border: 0.2rem solid ${ props => props.theme.primary };
    }

    &:hover {
        background-color: ${ props => props.theme.main };
    }
`;

const LoginForm = (props: LoginFormProps) => (
    <LoginContainer>
        <BearIcon />
        <LetMeInButton onClick={() => props.login()}>Let me in</LetMeInButton>
    </LoginContainer>
);

export default LoginForm;