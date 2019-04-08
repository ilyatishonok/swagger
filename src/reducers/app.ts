import { AppActionTypes, AppStates } from 'enums/app';
import { AppActions } from 'actions/appActions';

export interface AppState {
    appCode: AppStates;
    isAuthenticated: boolean;
}

const initialState = {
    appCode: 0,
    isAuthenticated: false,
};

const appReducer = (state: AppState = initialState, action: AppActions) => {
    switch (action.type) {
        case AppActionTypes.SET_APP_STATE:
            return { ...state, appCode: action.payload };
        case AppActionTypes.SET_USER_AUTHENTICATION_STATUS:
            return { ...state, isAuthenticated: action.payload };
        default:
            return state;
    }
};

export default appReducer;