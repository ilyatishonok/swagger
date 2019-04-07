import { connect } from 'react-redux';
import Filter from './Filter';
import { setEndDate, setStartDate } from '../../actions/jogsActions';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
    filters: state.jogs.filters,
});

const mapDispathToProps = {
    setStartDate,
    setEndDate,
}

export default connect(mapStateToProps, mapDispathToProps)(Filter);