import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { normalize } from 'normalizr';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import { jogsSchema, jogSchema } from '../schemas/jogs';
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

interface IAddJogResponse {
    response: JogEntity;
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

interface SetStartDateAction {
    type: JogsActionTypes.SET_START_DATE;
    payload: Date | null;
}
interface SetEndDateAction {
    type: JogsActionTypes.SET_END_DATE;
    payload: Date | null;
}

export type JogsActions = FetchJogsRequestAction | FetchJogsFailureAction | FetchJogsSuccessAction | SetStartDateAction | SetEndDateAction;

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

const addJogSuccess = (id: string) => ({
    type: JogsActionTypes.ADD_JOG,
    payload: id,
});

export const setStartDate = (startDate: Date | null): SetStartDateAction => ({
    type: JogsActionTypes.SET_START_DATE,
    payload: startDate,
});

export const setEndDate = (endDate: Date | null): SetEndDateAction => ({
    type: JogsActionTypes.SET_END_DATE,
    payload: endDate,
});

export const fetchJogs = (): ThunkAction<Promise<void>, RootState, void, Action> => {
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

export const addJog = (time: number, distance: number): ThunkAction<Promise<void>, RootState, void, Action> => {
    return async (dispatch) => {
        dispatch(setRequestStatus('ADD_JOG', true));
        
        const response: AxiosResponse<IAddJogResponse> = await api.post('/data/jog', {
            time,
            distance,
            date: new Date(),
        });

        const normalizedJog = normalize(response.data.response, jogSchema);

        dispatch(mergeEntites(normalizedJog.entities));
        dispatch(setRequestStatus('FETCH_JOGS', false));
        dispatch(addJogSuccess(response.data.response.id));
    }
}

export const editJog = (id: string, time: number, distance: number): ThunkAction<Promise<void>, RootState, void, Action> => {
    return async (dispatch, getState) => {
        const oldJog = getState().entities.jogs[id];

        dispatch(setRequestStatus(`EDIT_JOG_${oldJog.id}`, true));

        const response: AxiosResponse<IAddJogResponse> = await api.put('/data/jog', {
            time,
            distance,
            date: new Date(),
            jog_id: oldJog.id,
            user_id: oldJog.user_id,
        });

        const normalizedJog = normalize(response.data.response, jogSchema);

        dispatch(mergeEntites(normalizedJog.entities));
        dispatch(setRequestStatus(`EDIT_JOG_${oldJog.id}`, false));
    }
}