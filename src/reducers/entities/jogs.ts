import { NormalizedEntity } from 'reducers/entities';
import { EntitiesActions } from 'actions/entitiesActions';

export interface JogEntity {
    id: string;
    user_id: string;
    distance: number;
    time: number;
    date: number;
}

const jogEntityReducer = (state: NormalizedEntity<JogEntity> = {}, action: EntitiesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.jogs) {
                return {
                    ...state,
                    ...action.entities.jogs
                };
            }
            
            return state;
    }
};

export default jogEntityReducer;