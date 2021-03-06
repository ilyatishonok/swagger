import { ThunkAction } from 'redux-thunk';
import { AxiosResponse } from 'axios';
import { api } from 'api';
import history from 'browser-history';
import { RootState } from 'reducers';
import { AppStates } from 'enums/app';
import { setUserAuthenticationStatus, setAppState, AppActions } from 'actions/appActions';
import { setRequestStatus, RequestsActions } from 'actions/requestsActions';

export interface LoginUserResponse {
    response: {
        access_token: string;
    };
}

export const login = (): ThunkAction<void, RootState, void, AppActions | RequestsActions> => {
    return async (dispatch) => {
        try {
            dispatch(setRequestStatus(`LOGIN`, true));

            const response: AxiosResponse<LoginUserResponse> = await api.post('auth/uuidLogin', {
                uuid: 'hello',
            });

            localStorage.setItem('access_token', response.data.response.access_token);

            dispatch(setUserAuthenticationStatus(true));
            dispatch(setAppState(AppStates.APP_SUCCESS_INITIALIZED));

            dispatch(setRequestStatus(`LOGIN`, false));

            history.push(`${process.env.PUBLIC_URL}/`);
        } catch(error) {
            //TODO Handle error
        }
    }
};