import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { login } from 'actions/loginActions';
import { RootState } from 'reducers';

const mapStateToProps = (state: RootState) => ({
    isLoading: state.requests['LOGIN'],
});

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);