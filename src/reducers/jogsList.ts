import { JogsActionTypes } from '../enums/jogs';
import { JogEntity } from './entities/jogs';
import { JogsActions } from '../actions/jogsActions';
import { combineReducers } from 'redux';

interface JogsByIdState {
    data: string[];
    page: number;
    error?: string;
}

interface FiltersState {
    startDate: Date | null;
    endDate: Date | null;
}

export interface JogsState {
    jogsById: JogsByIdState,
    filters: FiltersState,
}

const jogsByIdInitialState = {
    data: [],
    page: 1,
};

const filterInitialState = {
    startDate: null,
    endDate: null,
};

const jogsByIdReducer = (state: JogsByIdState = jogsByIdInitialState, action: JogsActions) => {
    switch (action.type) {
        case JogsActionTypes.FETCH_JOGS_REQUEST:
            return { ...state, error: undefined };
        case JogsActionTypes.FETCH_JOGS_SUCCESS:
            return { ...state, data: action.payload };
        case JogsActionTypes.FETCH_JOGS_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

const filtersReducer = (state: FiltersState = filterInitialState, action: JogsActions) => {
    switch (action.type) {
        case JogsActionTypes.SET_START_DATE:
            return { ...state, startDate: action.payload };
        case JogsActionTypes.SET_END_DATE:
            return { ...state, endDate: action.payload };
        default:
            return state;
    }
}

export default combineReducers({
    jogsById: jogsByIdReducer,
    filters: filtersReducer,
});