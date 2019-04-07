import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { AppStates } from '../../enums/app';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/login-page';
import JogsPage from '../pages/jogs-page';

export interface IRoutesProps {
    appCode: AppStates;
    loadApp: () => void;
}

const Routes = (props: IRoutesProps) => {
    const { appCode, loadApp } = props;

    useEffect(() => {
        if (appCode === AppStates.APP_UNINITIALIZED) {
            loadApp();
        }
    })

    if (appCode === AppStates.APP_UNINITIALIZED || appCode === AppStates.APP_INITIALIZING) {
        return <div>Loading</div>
    }

    return (
        <Switch>
            <PrivateRoute path="/login" component={LoginPage} isInverted />
            <PrivateRoute exact path="/" component={JogsPage} />
        </Switch>
    );
}

export default Routes;