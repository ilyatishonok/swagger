import React from 'react';
import styled from 'styled-components';
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
        background-color: ${ props => props.theme.white };;
        align-items: center;
        justify-content: space-around;
    }
`;

const LetMeInButton = styled.button`
    margin-top: 3rem;
    background-color: ${ props => props.theme.transparent };;
    border-radius: 1.5rem;
    cursor: pointer;
    outline: none;
    padding: 0.7rem;
    color: ${ props => props.theme.white };
    border: 0.2rem solid ${ props => props.theme.white };;

    @media (max-width: 500px) {
        width: 90%;
        color: ${ props => props.theme.primary }
        border: 0.2rem solid ${ props => props.theme.primary };
    }

    &:hover {
        background-color: ${ props => props.theme.primary };
        color: ${ props => props.theme.white };
    }
`;

const LoginForm = (props: LoginFormProps) => (
    <LoginContainer>
        <BearIcon />
        <LetMeInButton onClick={() => props.login()}>Let me in</LetMeInButton>
    </LoginContainer>
);

export default LoginForm;