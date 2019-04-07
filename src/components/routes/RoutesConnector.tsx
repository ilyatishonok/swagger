import { connect } from 'react-redux';
import Routes from './Routes';
import { loadApp } from '../../actions/appActions';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
    appCode: state.app.appCode,
});

const mapDispatchToProps = {
    loadApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);