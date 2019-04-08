import React, { useState } from 'react';
import styled from 'styled-components';
import JogForm from 'components/jog-form';
import { JogEntity } from 'reducers/entities/jogs';

export interface IJogProps {
    jog: JogEntity;
}

const JogContainer = styled.li`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 20rem;

    @media (max-width: 500px) {
        width: 100%;
        flex-direction: column;
    }
`;

const JogInfo = styled.div`
    display: flex;
    margin-left: 2.5rem;
    flex-direction: column;

    @media (max-width: 500px) {
        margin-left: 0;
        align-items: center;
    }
`;

const JogAttribute = styled.div`
    margin-top: 0.5rem;
`;

const renderEditableAttributes = (jog: JogEntity) => (
    <>
        <JogAttribute><b>Distance:</b> {jog.distance}</JogAttribute>
        <JogAttribute><b>Time:</b> {jog.time}</JogAttribute>
    </>
);

const Jog = React.memo((props: IJogProps) => {
    const [isEdit, setEditState ] = useState(false);

    return (
        <JogContainer>
            <img onClick={() => setEditState(true)} src="/jog.svg" />
            <JogInfo>
                <JogAttribute>{new Date(props.jog.date * 1000).toDateString()}</JogAttribute>
                { isEdit ?
                    <JogForm
                        id={props.jog.id}
                        onSuccess={() => setEditState(false)}
                        onCancel={() => setEditState(false)}
                    />
                    : renderEditableAttributes(props.jog)
                }
            </JogInfo>
        </JogContainer>
    );
});

export default Jog;