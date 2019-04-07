import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { editJog, addJog } from '../../actions/jogsActions';
import JogForm, { IJogsAddFormProps, IFormFields } from './JogForm';
import { JogEntity } from '../../reducers/entities/jogs';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type IJogFormStateProps = {
    initialValues: Partial<IFormFields>;
} | undefined;

export interface IJogFormDispatchProps {
    onSubmit: (time: number, distance: number) => Promise<void>
}

const mapStateToProps = (state: RootState, props: IJogsAddFormProps) => {
    if (props.id) {
        return {
            initialValues: state.entities.jogs[props.id],
        };
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, Action>, ownProps: IJogsAddFormProps) => ({
    onSubmit: (time: number, distance: number) => {
        return ownProps.id ? 
            dispatch(editJog(ownProps.id, time, distance)) :
            dispatch(addJog(time, distance));
    }
});

export default connect<IJogFormStateProps, IJogFormDispatchProps, IJogsAddFormProps, RootState>(mapStateToProps, mapDispatchToProps)(JogForm);