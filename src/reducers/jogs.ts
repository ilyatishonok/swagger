import {combineReducers} from 'redux';
import {JogsActionTypes} from 'enums/jogs';
import {JogsActions} from 'actions/jogsActions';

interface JogsByIdState {
    data: string[];
    page: number;
    didInvalidate: boolean;
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
    didInvalidate: true,
};

const filterInitialState = {
    startDate: null,
    endDate: null,
};

const jogsByIdReducer = (state: JogsByIdState = jogsByIdInitialState, action: JogsActions) => {
    switch (action.type) {
        case JogsActionTypes.FETCH_JOGS_REQUEST:
            return { ...state, error: undefined, didInvalidate: false, };
        case JogsActionTypes.FETCH_JOGS_SUCCESS:
            return { ...state, data: action.payload };
        case JogsActionTypes.FETCH_JOGS_FAILURE:
            return { ...state, error: action.payload };
        case JogsActionTypes.SET_START_DATE:
            return { ...state, page: 1 };
        case JogsActionTypes.SET_END_DATE:
            return { ...state, page: 1 };
        case JogsActionTypes.GO_TO_NEW_PAGE:
            return { ...state, page: state.page + 1 };
        case JogsActionTypes.ADD_JOG:
            return {
                ...state,
                didInvalidate: false,
                data: [action.payload, ...state.data],
            };
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
};

export default combineReducers({
    jogsById: jogsByIdReducer,
    filters: filtersReducer,
});