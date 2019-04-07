import merge from 'lodash/fp/merge';
import { NormalizedEntity } from './entities';
import { EntitesActions } from '../../actions/entitiesActions';

export interface JogEntity {
    id: string;
    user_id: string;
    distance: number;
    time: number;
    date: number;
}

const jogEntityReducer = (state: NormalizedEntity<JogEntity> = {}, action: EntitesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.jogs) {
                return merge(action.entities.jogs, state);
            }
            
            return state;
    }
}

export default jogEntityReducer;