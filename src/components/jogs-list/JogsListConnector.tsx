import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { fetchJogs } from '../../actions/jogsActions';
import { getJogsById } from '../../selectors/jogs';
import JogsList from './JogsList';

const mapStateToProps = (state: RootState) => ({
    isFetching: state.requests['FETCH_JOGS'],
    error: state.jogs.error,
    jogs: getJogsById(state),
});

const mapDispatchToProps = {
    fetchJogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(JogsList);