import { createSelector } from 'reselect';
import { RootState } from '../reducers';

const jogsIds = (state: RootState) => state.jogs.jogs;
const jogsById = (state: RootState) => state.entities.jogs;

export const getJogsById = createSelector(
    jogsIds,
    jogsById,
    (ids, jogsById) => ids.map((id) => jogsById[id])
);