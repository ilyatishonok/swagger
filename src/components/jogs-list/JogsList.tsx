import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { JogEntity } from '../../reducers/entities/jogs';
import add from './add.svg';
import Jog from './Jog';
import JogsAddForm from '../jog-form';

export interface IJogsListProps {
    isFetching: boolean;
    jogs: JogEntity[];
    error?: string;
    fetchJogs: () => Promise<void>;
}

const JogsContainer = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: column;
    align-items: center;
`;

const AddJogButton = styled.div`
    position: fixed;
    right: 1rem;
    bottom: 1rem;
`;

const LoadMoreButton = styled.button`
    background: white;
    width: 50%;
    height: 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    color: ${ props => props.theme.primary };
    border: 0.2rem solid ${ props => props.theme.primary };
    outline: none;
    &:hover {
        background: ${ props => props.theme.primary };
        color: white;
    }
`;

const JogsList = React.memo((props: IJogsListProps) => {
    const { isFetching, error, jogs } = props;
    const [ isModalOpen, setModalState ] = useState(false);

    useEffect(() => {
        props.fetchJogs();
    }, []);

    if (isFetching) {
        return <div>Fetching</div>
    }

    return (
        <>
            <JogsContainer>
                {isModalOpen && <JogsAddForm focusAfterRender onSuccess={() => setModalState(false)} onCancel={() => { setModalState(false)}} /> }
                {jogs.map((jog) => {
                    return <Jog key={jog.id} jog={jog}></Jog>
                })}
            </JogsContainer>
            <LoadMoreButton>Load More</LoadMoreButton>
            <AddJogButton onClick={() => {
                setModalState(true);
            }}>
                <img src={add} />
            </AddJogButton>
        </> 
    );
});

export default JogsList;