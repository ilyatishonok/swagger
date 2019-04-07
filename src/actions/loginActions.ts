import { ThunkAction } from 'redux-thunk';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import history from '../history';
import { RootState } from '../reducers';
import { AppStates } from '../enums/app';
import { setUserAuthenticationStatus, setAppState, AppActions } from './appActions';

export interface LoginUserResponse {
    response: {
        access_token: string;
    }
}

export const login = (): ThunkAction<void, RootState, void, AppActions> => {
    return async (dispatch) => {        
        const response: AxiosResponse<LoginUserResponse> = await api.post('auth/uuidLogin', {
            uuid: 'hello',
        });

        localStorage.setItem('access_token', response.data.response.access_token);

        dispatch(setUserAuthenticationStatus(true));
        dispatch(setAppState(AppStates.APP_SUCCESS_INITIALIZED));

        history.push('/');
    }
}