import { EntitiesActionTypes } from 'enums/entities';
import { EntitiesState } from 'reducers/entities';

export interface MergeEntitiesAction {
    type: EntitiesActionTypes.MERGE_ENTITIES;
    entities: Partial<EntitiesState>;
}

export const mergeEntities = (entities: Partial<EntitiesState>): MergeEntitiesAction => ({
    type: EntitiesActionTypes.MERGE_ENTITIES,
    entities,
});

export type EntitiesActions = MergeEntitiesAction;