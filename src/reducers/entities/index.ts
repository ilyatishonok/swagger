import { combineReducers } from 'redux';
import jogsEntityReducer, { JogEntity } from './jogs';

export interface NormalizedEntity<S> {
    [key: string]: S;
}

export interface EntitiesState {
    jogs: NormalizedEntity<JogEntity>;
}

export default combineReducers<EntitiesState>({
    jogs: jogsEntityReducer,
});