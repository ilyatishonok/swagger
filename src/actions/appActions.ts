import { ThunkAction } from 'redux-thunk';
import { api } from 'api';
import { RootState } from 'reducers';
import { AppActionTypes, AppStates } from 'enums/app';

export interface SetAppStateAction {
    type: AppActionTypes.SET_APP_STATE;
    payload: AppStates;
}

export interface SetUserAuthenticationStatusAction {
    type: AppActionTypes.SET_USER_AUTHENTICATION_STATUS;
    payload: boolean;
}

export type AppActions = SetAppStateAction | SetUserAuthenticationStatusAction;

export const setAppState = (appState: AppStates): SetAppStateAction => ({
    type: AppActionTypes.SET_APP_STATE,
    payload: appState,
});

export const setUserAuthenticationStatus = (status: boolean): SetUserAuthenticationStatusAction => ({
    type: AppActionTypes.SET_USER_AUTHENTICATION_STATUS,
    payload: status,
});

export const loadApp = (): ThunkAction<void, RootState, void, AppActions> => {
    return async (dispatch) => {
        try {
            dispatch(setAppState(AppStates.APP_INITIALIZING));

            if (!localStorage.getItem('access_token')) {
                dispatch(setAppState(AppStates.APP_SUCCESS_INITIALIZED));

                return;
            }

            await api.get('/auth/user');

            //More server latency
            setTimeout(() => {
                dispatch(setUserAuthenticationStatus(true));
                dispatch(setAppState(AppStates.APP_SUCCESS_INITIALIZED));
            }, 1000);
        } catch(error) {
            //TODO Handle error
        }
    }
};