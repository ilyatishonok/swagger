import { combineReducers } from 'redux';
import appReducer, { AppState } from './app';
import requestsReducer, { RequestsState } from './requests';
import jogsListReducer, { JogsListState } from './jogsList';
import entitiesReducer, { EntitiesState } from './entities/entities';


export interface RootState {
    app: AppState;
    requests: RequestsState;
    jogs: JogsListState;
    entities: EntitiesState;
}

export const rootReducer = combineReducers({
    app: appReducer,
    requests: requestsReducer,
    jogs: jogsListReducer,
    entities: entitiesReducer,
});