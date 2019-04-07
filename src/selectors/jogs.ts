import { createSelector } from 'reselect';
import { RootState } from '../reducers';

const jogsIds = (state: RootState) => state.jogs.jogsById.data;
const jogsById = (state: RootState) => state.entities.jogs;
const getPage = (state: RootState) => state.jogs.jogsById.page;
const getFilters = (state: RootState) => state.jogs.filters;

export const getJogsById = createSelector(
    jogsIds,
    jogsById,
    getPage,
    (ids, jogsById, page) => {
        const range = ids.slice(0, page*10);

        return range.map((id) => jogsById[id])
    }
);

export const getFilteredJogsById = createSelector(
    getJogsById,
    getFilters,
    (jogs, filters) => jogs.filter((jog) => {
        return true;
    })
)