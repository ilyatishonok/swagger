import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface AuthRouteProps extends RouteProps {
    redirectTo?: string;
    isInverted?: boolean;
}

const PrivateRoute = (props: AuthRouteProps) => {
    const { redirectTo, isInverted, component } = props;

    return (
        <Route
            render={(props) => {
                const accessToken = localStorage.getItem('access_token');

                if (accessToken) {
                    return isInverted 
                        ? <Redirect to={redirectTo || '/'} /> 
                        : React.createElement(component!, props);
                }

                return isInverted 
                    ? React.createElement(component!, props)
                    : <Redirect to={redirectTo || 'login'} />
            }} 
        />
    )
}

export default PrivateRoute;