import { connect } from 'react-redux';
import Header from './Header';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.app.isAuthenticated,
});

export default connect(mapStateToProps)(Header);