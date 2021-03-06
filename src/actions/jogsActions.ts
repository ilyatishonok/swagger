import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { normalize } from 'normalizr';
import { AxiosResponse } from 'axios';
import { api } from 'api';
import { RootState } from 'reducers';
import { jogsSchema, jogSchema } from 'schemas/jogs';
import { mergeEntities } from 'actions/entitiesActions';
import { setRequestStatus } from 'actions/requestsActions';
import { JogsActionTypes } from 'enums/jogs';
import { JogEntity } from 'reducers/entities/jogs';

interface IFetchJogsResponse {
    response: {
        jogs: JogEntity[];
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

interface AddJogAction {
    type: JogsActionTypes.ADD_JOG;
    payload: {
        id: string;
        resetPage?: boolean;
    };
}

interface SetStartDateAction {
    type: JogsActionTypes.SET_START_DATE;
    payload: Date | null;
}
interface SetEndDateAction {
    type: JogsActionTypes.SET_END_DATE;
    payload: Date | null;
}

interface GoToNewPageAction {
    type: JogsActionTypes.GO_TO_NEW_PAGE,
}

export type JogsActions = FetchJogsRequestAction |
    FetchJogsFailureAction |
    FetchJogsSuccessAction |
    SetStartDateAction |
    SetEndDateAction |
    AddJogAction |
    GoToNewPageAction;

const fetchJogsRequest = (): FetchJogsRequestAction => ({
    type: JogsActionTypes.FETCH_JOGS_REQUEST,
});

const fetchJogsSuccess = (result: string[]): FetchJogsSuccessAction => ({
    type: JogsActionTypes.FETCH_JOGS_SUCCESS,
    payload: result,
});

const fetchJogsFailure = (error: string): FetchJogsFailureAction => ({
    type: JogsActionTypes.FETCH_JOGS_FAILURE,
    payload: error,
});

const addJogSuccess = (id: string, resetPage?: boolean): AddJogAction => ({
    type: JogsActionTypes.ADD_JOG,
    payload: {
        id,
        resetPage,
    },
});

export const setStartDate = (startDate: Date | null): SetStartDateAction => ({
    type: JogsActionTypes.SET_START_DATE,
    payload: startDate,
});

export const setEndDate = (endDate: Date | null): SetEndDateAction => ({
    type: JogsActionTypes.SET_END_DATE,
    payload: endDate,
});

export const goToNewPage = (): GoToNewPageAction => ({
    type: JogsActionTypes.GO_TO_NEW_PAGE,
});

export const fetchJogs = (): ThunkAction<Promise<void>, RootState, void, Action> => {
    return async (dispatch) => {
        try {
            //TODO Use batch actions
            dispatch(fetchJogsRequest());
            dispatch(setRequestStatus('FETCH_JOGS', true));

            const response: AxiosResponse<IFetchJogsResponse> = await api.get('/data/sync');

            const reversedJogs = [...response.data.response.jogs].reverse();
            const normalizedJogs = normalize(reversedJogs, jogsSchema);

            //More server latency
            setTimeout(() => {
                //TODO use batch actions
                dispatch(mergeEntities(normalizedJogs.entities));
                dispatch(fetchJogsSuccess(normalizedJogs.result));
                dispatch(setRequestStatus('FETCH_JOGS', false));
            }, 1000);
        } catch(error) {
            //TODO Handle error
        }
    }
};

export const addJog = (time: number, distance: number): ThunkAction<Promise<void>, RootState, void, Action> => {
    return async (dispatch, getState) => {
        dispatch(setRequestStatus('ADD_JOG', true));

        const response: AxiosResponse<IAddJogResponse> = await api.post('/data/jog', {
            time,
            distance,
            date: new Date(),
        });

        const normalizedJog = normalize(response.data.response, jogSchema);

        const filters = getState().jogs.filters;

        //TODO Use batch actions
        dispatch(mergeEntities(normalizedJog.entities));
        dispatch(addJogSuccess(response.data.response.id, !!filters.startDate || !!filters.endDate));
        dispatch(setRequestStatus('ADD_JOGS', false));
    }
};

export const editJog = (id: string, time: number, distance: number): ThunkAction<Promise<void>, RootState, void, Action> => {
    return async (dispatch, getState) => {
        const oldJog = getState().entities.jogs[id];

        dispatch(setRequestStatus(`EDIT_JOG_${oldJog.id}`, true));

        const response: AxiosResponse<IAddJogResponse> = await api.put('/data/jog', {
            time,
            distance,
            date: new Date(oldJog.date),
            jog_id: oldJog.id,
            user_id: oldJog.user_id,
        });

        const normalizedJog = normalize(response.data.response, jogSchema);

        //TODO Use batch actions
        dispatch(mergeEntities(normalizedJog.entities));
        dispatch(setRequestStatus(`EDIT_JOG_${oldJog.id}`, false));
    }
};