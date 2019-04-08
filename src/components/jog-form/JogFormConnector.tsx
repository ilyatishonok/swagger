import { connect } from 'react-redux';
import { RootState } from 'reducers';
import { editJog, addJog } from 'actions/jogsActions';
import JogForm, { IJogFormOwnProps, IJogFormDispatchProps, IJogFormStoreProps } from './JogForm';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

const mapStateToProps = (state: RootState, props: IJogFormOwnProps): IJogFormStoreProps => {
    if (props.id) {
        return {
            initialValues: state.entities.jogs[props.id],
        };
    }

    return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, Action>, ownProps: IJogFormOwnProps): IJogFormDispatchProps => ({
    onSubmit: (time: number, distance: number) => {
        return ownProps.id ? 
            dispatch(editJog(ownProps.id, time, distance)) :
            dispatch(addJog(time, distance));
    }
});

export default connect<IJogFormStoreProps, IJogFormDispatchProps, IJogFormOwnProps, RootState>(mapStateToProps, mapDispatchToProps)(JogForm);