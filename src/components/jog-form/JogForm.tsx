import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import icon from './icon.svg';
import success from './success.svg';
import cancel from './cancel.svg';

export interface IFormFields {
    time: number | null;
    distance: number | null;
}

export type IFormErrors<P> = {
    [P in keyof T]?: string;
}

export interface IJogsAddFormProps {
    id?: string;
    initialValues?: Partial<IFormFields>;
    onCancel: () => void;
    onSuccess?: () => void;
    focusAfterRender?: boolean;
    onSubmit: (time: number, distance: number) => Promise<void>;
}

export interface IJogsAddFormState {
    fields: IFormFields;
    errors: IFormErrors<IFormFields>;
}

const StyledAddForm = styled.form`
    display: flex;
    flex-direction: row;

    @media (max-width: 500px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
    }
`;

const Input = styled.input`
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const Fields = styled.div`
    margin-left: 2.5rem;
    display: flex;
    flex-direction: column;

    @media (max-width: 500px) {
        margin-left: 0;
    }
`;

const Field = styled.div`
    margin-top: 0.5rem;
`;

const Error = styled.div`
    color: red;
`;

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 1rem;
    
    @media (max-width: 500px) {
        margin-top: 1rem;
        margin-left: 0;
        width: 30%;
        flex-direction: row;
    }
`;

const Action = styled.img`
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
        const { id, onSubmit, onSuccess } = this.props;
        const { fields: { time, distance } } = this.state;

        const errors = this.validateFields();

        if (!_.isEmpty(errors)) {
            return this.setState({
                errors,
            });
        }

        return onSubmit(time!, distance!).then(() => {
            onSuccess && onSuccess();
        });
    }

    private validateFields() {
        const { time, distance } = this.state.fields;
        const errors = {};

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

    public renderInput(fieldName: keyof IFormFields) {
        return (
            <Input value={this.state.fields[fieldName] || ''} onChange={(event) => this.onChange(event, fieldName)} />
        );
    }

    public render() {
        const { id, onCancel } = this.props;
        const { errors } = this.state;

        if (id) {
            return (
                <StyledAddForm>
                    <div>
                        <Field>
                            <b>Distance: </b>
                            {this.renderInput('distance')}
                            {errors.distance && <Error>{errors.distance}</Error>}
                        </Field>
                        <Field>
                            <b>Time: </b>
                            {this.renderInput('time')}
                            {errors.time && <Error>{errors.time}</Error>}
                        </Field>
                    </div>
                    <Actions>
                        <Action src={cancel} onClick={onCancel} />
                        <Action src={success} onClick={this.onSubmit} />
                    </Actions>
                </StyledAddForm>
            );
        }

        return (
            <StyledAddForm>
                { id && <img src={icon} /> }
                <Fields>
                    <Field>
                        Distance: <Input ref={this.inputRef} onChange={(event) => this.onChange(event, 'distance')} />
                    </Field>
                    <Field>
                        Time: <Input onChange={(event) => this.onChange(event, 'time')} />
                    </Field>
                </Fields>
                <Actions>
                    <Action src={cancel} onClick={onCancel} />
                    <Action src={success} onClick={this.onSubmit} />
                </Actions>
            </StyledAddForm>
        );
    }
}