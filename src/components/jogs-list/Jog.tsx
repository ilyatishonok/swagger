import React from 'react';
import styled from 'styled-components';
import icon from './icon.svg';
import { JogEntity } from '../../reducers/entities/jogs';

export interface IJogProps {
    jog: JogEntity;
}

const JogContainer = styled.li`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const JogInfo = styled.div`
    display: flex;
    margin-left: 2.5rem;
    flex-direction: column;
`;

const JogAttribute = styled.div`
    margin-top: 0.5rem;
`;

const Jog = React.memo((props: IJogProps) => (
    <JogContainer>
        <img src={icon} />
        <JogInfo>
            <JogAttribute>{new Date(props.jog.date).toDateString()}</JogAttribute>
            <JogAttribute><b>Speed:</b> 15</JogAttribute>
            <JogAttribute><b>Distance:</b> {props.jog.distance}</JogAttribute>
            <JogAttribute><b>Time:</b> {props.jog.time}</JogAttribute>
        </JogInfo>
    </JogContainer>
));

export default Jog;