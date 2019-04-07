import React from 'react';
import styled from 'styled-components';

export interface IFormFields {
    time: number | null;
    distance: number | null;
}

export interface IJogsAddFormProps {
    id?: string;
    initialValues?: Partial<IFormFields>;
    onCancel: () => void;
    onSuccess?: () => void;
    onSubmit: (time: number, distance: number) => Promise<void>;
}

export interface IJogsAddFormState {
    fields: IFormFields;
}

const JogAttribute = styled.form`
    margin-top: 0.5rem;
`;

export default class JogsAddForm extends React.Component<IJogsAddFormProps, IJogsAddFormState> {
    constructor(props: IJogsAddFormProps) {
        super(props);

        this.state = this.getDefaultState();
    }

    private getDefaultState() {
        const { initialValues } = this.props;

        if (initialValues) {
            return {
                fields: {
                    time: initialValues.time || null,
                    distance: initialValues.distance || null,
                },
            };
        }

        return {
            fields: {
                time: null,
                distance: null,
            },
        };
    }

    private onSubmit = () => {
        const { id, onSubmit, onSuccess } = this.props;
        const { fields: { time, distance } } = this.state;

        if (id) {
            return onSubmit(time!, distance!).then(() => {
                onSuccess && onSuccess();
            });
        }
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof IFormFields) => {
        const value = event.currentTarget.value;

        const fields = {
            ...this.state.fields,
            [fieldName]: value,
        };

        this.setState({ fields });
    }

    public renderInput(fieldName: keyof IFormFields) {
        return (
            <input value={this.state.fields[fieldName] || ''} onChange={(event) => this.onChange(event, fieldName)} />
        );
    }

    public render() {
        const { id, initialValues, onCancel } = this.props;

        if (id && initialValues) {
            return (
                <>
                    <JogAttribute><b>Distance:</b>{this.renderInput('distance')}</JogAttribute>
                    <JogAttribute><b>Time:</b>{this.renderInput('time')}</JogAttribute>
                    <button onClick={this.onSubmit}>Save</button>
                    <button onClick={this.props.onCancel}>Cancel</button>
                </>
            )
        }

        return (
            <form>
                Distance: <input onChange={(event) => this.onChange(event, 'distance')} />
                Time: <input onChange={(event) => this.onChange(event, 'time')} />
                <button>Save</button>
            </form>
        );
    }
}