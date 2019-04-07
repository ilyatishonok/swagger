import { ThunkAction } from 'redux-thunk';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import history from '../history';
import { RootState } from '../reducers';
import { AppStates } from '../enums/app';
import { setUserAuthenticationStatus, setAppState, AppActions } from './appActions';
import { setRequestStatus, RequestsActions } from './requestsActions';

export interface LoginUserResponse {
    response: {
        access_token: string;
    }
}

export const login = (): ThunkAction<void, RootState, void, AppActions | RequestsActions> => {
    return async (dispatch) => { 
        dispatch(setRequestStatus(`LOGIN`, true));       
        const response: AxiosResponse<LoginUserResponse> = await api.post('auth/uuidLogin', {
            uuid: 'hello',
        });

        localStorage.setItem('access_token', response.data.response.access_token);

        dispatch(setUserAuthenticationStatus(true));
        dispatch(setAppState(AppStates.APP_SUCCESS_INITIALIZED));

        dispatch(setRequestStatus(`LOGIN`, false));

        history.push('/');
    }
}