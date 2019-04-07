import React, { useState } from 'react';
import styled from 'styled-components';
import icon from './icon.svg';
import JogForm from '../jog-form';
import { JogEntity } from '../../reducers/entities/jogs';

export interface IJogProps {
    jog: JogEntity;
}

const JogContainer = styled.li`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 500px) {
        width: 100%;
    }
`;

const JogInfo = styled.div`
    display: flex;
    margin-left: 2.5rem;
    flex-direction: column;
`;

const JogAttribute = styled.div`
    margin-top: 0.5rem;
`;

const renderAttributes = (jog: JogEntity) => (
    <>
        <JogAttribute><b>Distance:</b> {jog.distance}</JogAttribute>
        <JogAttribute><b>Time:</b> {jog.time}</JogAttribute>
    </>
);

const Jog = React.memo((props: IJogProps) => {
    const [isEdit, setEditState ] = useState(false);

    return (
        <JogContainer onDoubleClick={() => setEditState(!isEdit)}>
            <img src={icon} />
            <JogInfo>
                <JogAttribute>{new Date(props.jog.date).toDateString()}</JogAttribute>
                { isEdit ?
                    <JogForm onSuccess={() => setEditState(!isEdit)} id={props.jog.id} onCancel={() => setEditState(!isEdit)} /> :
                    renderAttributes(props.jog)
                }
            </JogInfo>
        </JogContainer>
    );
});

export default Jog;