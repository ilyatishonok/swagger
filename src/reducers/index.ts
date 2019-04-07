import { combineReducers } from 'redux';
import appReducer, { AppState } from './app';
import requestsReducer, { RequestsState } from './requests';
import jogsReducer, { JogsState } from './jogsList';
import entitiesReducer, { EntitiesState } from './entities/entities';


export interface RootState {
    app: AppState;
    requests: RequestsState;
    jogs: JogsState;
    entities: EntitiesState;
}

export const rootReducer = combineReducers({
    app: appReducer,
    requests: requestsReducer,
    jogs: jogsReducer,
    entities: entitiesReducer,
});