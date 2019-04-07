import { JogsActionTypes } from '../enums/jogs';
import { JogEntity } from './entities/jogs';
import { JogsActions } from '../actions/jogsActions';

export interface JogsListState {
    jogs: string[];
    error?: string;
}

const initialState = {
    jogs: [],
}

const jogsReducer = (state: JogsListState = initialState, action: JogsActions) => {
    switch (action.type) {
        case JogsActionTypes.FETCH_JOGS_REQUEST:
            return { ...state, error: undefined };
        case JogsActionTypes.FETCH_JOGS_SUCCESS:
            return { ...state, jogs: action.payload };
        case JogsActionTypes.FETCH_JOGS_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export default jogsReducer;