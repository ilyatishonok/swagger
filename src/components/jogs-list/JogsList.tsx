import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ITheme } from "theme";
import Jog from './Jog';
import JogsAddForm from 'components/jog-form';
import { JogEntity } from 'reducers/entities/jogs';

export interface IJogsListProps {
    isFetching: boolean;
    jogs: JogEntity[];
    error?: string;
    didInvalidate?: boolean;
    hasMore: boolean;
    fetchJogs: () => Promise<void>;
    loadMore: () => void;
}

const JogsContainer = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const AddJogButton = styled.div<{ visible?: boolean }>`
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    cursor: pointer;
    
    display: ${ props => props.visible ? 'block' : 'none' };
`;

const WithoutJogs = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
`;

const TextMessage = styled.h3`
    color: gray;
    text-align: center;
`;

const LoadMoreButton = styled.button<{ visible?: boolean, theme: ITheme }>`
    display: ${ props => props.visible ? 'block' : 'none' };
    background: ${ props => props.theme.white };
    width: 100%;
    height: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    cursor: pointer;
    color: ${ props => props.theme.primary };
    border: 0.2rem solid ${ props => props.theme.primary };
    outline: none;
    
    &:hover {
        background: ${ props => props.theme.primary };
        color: ${ props => props.theme.white };;
    }
`;

const JogsList = React.memo((props: IJogsListProps) => {
    const {
        isFetching,
        didInvalidate,
        jogs,
        fetchJogs,
        loadMore,
        hasMore,
    } = props;
    const [ isModalOpen, setModalState ] = useState(false);

    useEffect(() => {
        if (!jogs.length) {
            fetchJogs();
        }
    }, []);

    if (didInvalidate) {
        return null;
    }

    if (isFetching) {
        return <img src={process.env.PUBLIC_URL + '/infinity.svg'} />
    }

    return (
        <>
            <JogsContainer>
                {isModalOpen &&
                        <JogsAddForm
                            focusAfterRender
                            onSuccess={() => setModalState(false)}
                            onCancel={() => setModalState(false)}/>
                }
                {(!isModalOpen && !jogs.length) &&
                    <WithoutJogs>
                        <img src={process.env.PUBLIC_URL + '/sad.svg'} />
                        <TextMessage>Hmm...where are jogs? Click to green plus button to add it</TextMessage>
                    </WithoutJogs>
                }
                {jogs.map((jog) => <Jog key={jog.id} jog={jog} />)}
                <LoadMoreButton onClick={loadMore} visible={hasMore}>
                    Load More
                </LoadMoreButton>
            </JogsContainer>
            <AddJogButton visible={!isModalOpen} onClick={() => setModalState(true)}>
                <img src={process.env.PUBLIC_URL + '/add.svg'} />
            </AddJogButton>
        </>
    );
});

export default JogsList;