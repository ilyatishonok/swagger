import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { Switch } from 'react-router-dom';
import { AppStates } from 'enums/app';
import Header from 'components/header';
import LoginPage from 'components/pages/login-page';
import JogsPage from 'components/pages/jogs-page';
import InfoPage from "components/pages/info-page";
import NotFoundPage from "components/pages/not-fount-page";
import PrivateRoute from './PrivateRoute';
import infinity from './infinity.svg';

export interface IRoutesProps {
    appCode: AppStates;
    loadApp: () => void;
}

const Loading = styled.img``;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
`;

const Routes = (props: IRoutesProps) => {
    const { appCode, loadApp } = props;

    useEffect(() => {
        if (appCode === AppStates.APP_UNINITIALIZED) {
            loadApp();
        }
    });

    if (appCode === AppStates.APP_UNINITIALIZED || appCode === AppStates.APP_INITIALIZING) {
        return (
            <LoadingContainer>
                <Loading src={process.env.PUBLIC_URL + 'infinity.svg'} />
            </LoadingContainer>
        );
    }

    return (
        <>
            <Header />
            <Switch>
                <PrivateRoute exact path="/" component={JogsPage} />
                <PrivateRoute path="/login" component={LoginPage} isInverted />
                <PrivateRoute path="/info" component={InfoPage} />
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </>
    );
};

export default Routes;