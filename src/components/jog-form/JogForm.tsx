import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import SuccessIcon from './icons/SuccessIcon';
import CancelIcon from './icons/CancelIcon';

export interface IFormFields {
    time: number | null;
    distance: number | null;
}

export type IFormErrors<T> = {
    [P in keyof T]?: string;
}

export interface IJogFormOwnProps {
    id?: string;
    onCancel: () => void;
    onSuccess?: () => void;
    onFailure?: () => void;
    focusAfterRender?: boolean;
}

export interface IJogFormStoreProps {
    initialValues?: Partial<IFormFields>;
}

export interface IJogFormDispatchProps {
    onSubmit: (time: number, distance: number) => Promise<void>;
}

export type IJogsAddFormProps = IJogFormDispatchProps & IJogFormOwnProps & IJogFormStoreProps;

export interface IJogsAddFormState {
    fields: IFormFields;
    errors: IFormErrors<IFormFields>;
}

const StyledEditForm = styled.form`
    display: flex;
    flex-direction: column;

    @media (max-width: 500px) {
        width: 100%;
        align-items: center;
    }
`;

const FormInput = styled.input`
    padding: 0.3rem;
    border-radius: 0.2rem;
    outline: none;
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const EditFormField = styled.div`
    margin-top: 0.5rem;
`;

const EditActions = styled.div`
    display: flex;
    flex-direction: row;    
    justify-content: space-around;
    width: 80%;
    margin-top: 1rem;
    
    @media (max-width: 500px) {
        margin-left: 0;
        width: 30%;
    }
`;

const StyledAddForm = styled.form`
    margin-top: 1rem;
    padding: 1rem 3rem 1rem 3rem;
    border-radius: 1rem;
    background: ${ props => props.theme.main };
`;

const AddFormField = styled.div`
    margin-top: 1rem;
    
    &>input {
        padding: 0.4rem;
        width: 100%;
    }
`;

const AddFormActions = styled.div`
    display: flex;
    flex-direction: row;    
    justify-content: space-around;
    width: 100%;
    margin-top: 1rem;
`;

const Error = styled.div`
    color: red;
`;

const Action = styled.div`
    cursor: pointer;
`;

export default class JogsAddForm extends React.Component<IJogsAddFormProps, IJogsAddFormState> {
    private readonly inputRef: React.RefObject<HTMLInputElement>;
    
    constructor(props: IJogsAddFormProps) {
        super(props);

        this.state = this.getDefaultState();
        this.inputRef = React.createRef();
    }

    private getDefaultState() {
        const { initialValues } = this.props;

        if (initialValues) {
            return {
                fields: {
                    time: initialValues.time || null,
                    distance: initialValues.distance || null,
                },
                errors: {},
            };
        }

        return {
            fields: {
                time: null,
                distance: null,
            },
            errors: {},
        };
    }

    public componentDidMount() {
        if (this.props.focusAfterRender) {
            this.inputRef.current && this.inputRef.current.focus();
        }
    }

    private onSubmit = (event: any) => {
        event.preventDefault();
        const { onSubmit, onSuccess, onFailure } = this.props;
        const { fields: { time, distance } } = this.state;

        const errors = this.validateFields();

        if (!_.isEmpty(errors)) {
            return this.setState({
                errors,
            });
        }

        return onSubmit(time!, distance!).then(() => {
            onSuccess && onSuccess();
        }).catch(() => {
            onFailure && onFailure();
        });
    }

    private validateFields() {
        const { time, distance } = this.state.fields;
        const errors: IFormErrors<IFormFields> = {};

        if (time === null) {
            errors.time = 'This field is required';
        }

        if (distance === null) {
            errors.distance = 'This field is required';
        }

        return errors;
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof IFormFields) => {
        const value = event.currentTarget.value;
        const regularExpression = /^[0-9.]+$/;

        if (value && !regularExpression.test(value)) {
            return;
        }

        const fields = {
            ...this.state.fields,
            [fieldName]: value || null,
        };

        this.setState({ fields });
    }

    public renderInput(fieldName: keyof IFormFields, focus?: boolean) {
        return (
            <FormInput
                value={this.state.fields[fieldName] || ''}
                onChange={(event) => this.onChange(event, fieldName)}
                ref={focus ? this.inputRef : null}
            />
        );
    }

    public renderEditForm() {
        const { onCancel } = this.props;
        const { errors } = this.state;

        return (
            <StyledEditForm>
                <div>
                    <EditFormField>
                        <b>Distance: </b>
                        {this.renderInput('distance')}
                        {errors.distance && <Error>{errors.distance}</Error>}
                    </EditFormField>
                    <EditFormField>
                        <b>Time: </b>
                        {this.renderInput('time')}
                        {errors.time && <Error>{errors.time}</Error>}
                    </EditFormField>
                </div>
                <EditActions>
                    <Action onClick={onCancel}>
                        <CancelIcon/>
                    </Action>
                    <Action onClick={this.onSubmit}>
                        <SuccessIcon/>
                    </Action>
                </EditActions>
            </StyledEditForm>
        );
    }

    public renderAddForm() {
        const { onCancel, focusAfterRender } = this.props;
        const { errors } = this.state;

        return (
            <StyledAddForm>
                <div>
                    <AddFormField>
                        <b>Distance: </b>
                        {this.renderInput('distance', focusAfterRender)}
                        {errors.distance && <Error>{errors.distance}</Error>}
                    </AddFormField>
                    <AddFormField>
                        <b>Time: </b>
                        {this.renderInput('time')}
                        {errors.time && <Error>{errors.time}</Error>}
                    </AddFormField>
                </div>
                <AddFormActions>
                    <Action onClick={onCancel}>
                        <CancelIcon/></Action>
                    <Action onClick={this.onSubmit}>
                        <SuccessIcon/>
                    </Action>
                </AddFormActions>
            </StyledAddForm>
        );
    }

    public render() {
        const {id} = this.props;

        return id ? this.renderEditForm() : this.renderAddForm();
    }
}