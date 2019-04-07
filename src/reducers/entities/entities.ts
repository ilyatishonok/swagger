import { combineReducers } from 'redux';
import jogsEntityReducer, { JogEntity } from './jogs';
import userEntityReducer, { UserEntity } from './users';

export interface NormalizedEntity<S> {
    [key: string]: S;
}

export interface EntitiesState {
    jogs: NormalizedEntity<JogEntity>;
    users: NormalizedEntity<UserEntity>
}

export default combineReducers<EntitiesState>({
    users: userEntityReducer,
    jogs: jogsEntityReducer,
});