import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import JogsList from '../../jogs-list';
import icon from './add.svg';

const AddJogButton = styled.div`
    position: fixed;
    right: 1rem;
    bottom: 1rem;
`;

const JogsPage = (props: RouteComponentProps) => {
    return (
        <>
            <JogsList />
            <AddJogButton onClick={() => props.history.push('/jogs/add')}><img src={icon} /></AddJogButton>
        </>
    );
}

export default JogsPage;