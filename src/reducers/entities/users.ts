import merge from 'lodash/fp/merge';
import { NormalizedEntity } from './entities';
import { EntitesActions } from '../../actions/entitiesActions';

export interface UserEntity {
    id: string;
    email: string;
    phone: string;
    role: string;
    first_name: string;
    last_name: string;
}

const userEntityReducer = (state: NormalizedEntity<UserEntity> = {}, action: EntitesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.users) {
                return merge(action.entities.users, state);
            }
            
            return state;
    }
}

export default userEntityReducer