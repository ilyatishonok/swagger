import { createSelector } from 'reselect';
import { RootState } from 'reducers';

const jogsIds = (state: RootState) => state.jogs.jogsById.data;
const jogsById = (state: RootState) => state.entities.jogs;
const getPage = (state: RootState) => state.jogs.jogsById.page;
const getFilters = (state: RootState) => state.jogs.filters;

export const getJogsById = createSelector(
    jogsIds,
    jogsById,
    (ids, jogsById) => ids.map((id) => jogsById[id])
);

export const getFilteredJogsById = createSelector(
    getJogsById,
    getFilters,
    (jogs, filters) => {
        let newJogs = jogs;
        const { startDate, endDate } = filters;

        if (startDate) {
            newJogs = newJogs.filter(jog => new Date(jog.date * 1000) > startDate);
        }

        if (endDate) {
            newJogs = newJogs.filter(jog => new Date(jog.date * 1000) < endDate);
        }

        return newJogs;
    }
);

export const getPaginatedJogsObject = createSelector(
    getFilteredJogsById,
    getPage,
    (jogs, page) => {
        const paginatedJogs = jogs.slice(0, page*10);

        return {
            hasMore: paginatedJogs.length === page * 10 && !!jogs[page*10],
            jogs: paginatedJogs,
        };
    }
);