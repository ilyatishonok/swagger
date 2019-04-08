import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { fetchJogs, goToNewPage } from 'actions/jogsActions';
import { getPaginatedJogsObject } from 'selectors/jogs';
import JogsList from './JogsList';

const mapStateToProps = (state: RootState) => {
    const paginatedJogsObject = getPaginatedJogsObject(state);

    return {
        isFetching: state.requests['FETCH_JOGS'],
        error: state.jogs.jogsById.error,
        didInvalidate: state.jogs.jogsById.didInvalidate,
        hasMore: paginatedJogsObject.hasMore,
        jogs: paginatedJogsObject.jogs,
    }
};

const mapDispatchToProps = {
    fetchJogs,
    loadMore: goToNewPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(JogsList);
