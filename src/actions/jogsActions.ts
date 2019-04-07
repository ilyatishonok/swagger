import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { normalize } from 'normalizr';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import { jogsSchema } from '../schemas/jogs';
import { mergeEntites } from '../actions/entitiesActions';
import { setRequestStatus } from './requestsActions';
import { JogsActionTypes } from '../enums/jogs';
import { JogEntity } from '../reducers/entities/jogs';
import { RootState } from '../reducers';

interface IFetchJogsResponse {
    response: {
        jogs: JogEntity;
    };
}

interface FetchJogsRequestAction {
    type: JogsActionTypes.FETCH_JOGS_REQUEST;
}

interface FetchJogsSuccessAction {
    type: JogsActionTypes.FETCH_JOGS_SUCCESS;
    payload: string[];
}

interface FetchJogsFailureAction {
    type: JogsActionTypes.FETCH_JOGS_FAILURE;
    payload: string;
}

export type JogsActions = FetchJogsRequestAction | FetchJogsFailureAction | FetchJogsSuccessAction;

const fetchJogsRequest = () => ({
    type: JogsActionTypes.FETCH_JOGS_REQUEST,
});

const fetchJogsSuccess = (result: string) => ({
    type: JogsActionTypes.FETCH_JOGS_SUCCESS,
    payload: result,
});

const fetchJogsFailure = (error: string) => ({
    type: JogsActionTypes.FETCH_JOGS_FAILURE,
    payload: error,
});

export const fetchJogs = (): ThunkAction<void, RootState, void, Action> => {
    return async (dispatch) => {
        dispatch(setRequestStatus('FETCH_JOGS', true));
        dispatch(fetchJogsRequest());

        const response: AxiosResponse<IFetchJogsResponse> = await api.get('/data/sync');

        const normalizedJogs = normalize(response.data.response.jogs, jogsSchema);

        dispatch(mergeEntites(normalizedJogs.entities));
        dispatch(setRequestStatus('FETCH_JOGS', false));
        dispatch(fetchJogsSuccess(normalizedJogs.result));
    }
}