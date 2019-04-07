import React from 'react';
import styled from 'styled-components';
import { JogEntity } from '../../reducers/entities/jogs';
import Jog from './Jog';

export interface IJogsListProps {
    isFetching: boolean;
    jogs: JogEntity[];
    error?: string;
    fetchJogs: () => Promise<void>;
}

const JogsContainer = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default class JogsList extends React.PureComponent<IJogsListProps> {
    componentDidMount() {
        this.props.fetchJogs().then(() => {
            console.log(this);
        });
    }

    render() {
        const { isFetching, error, jogs } = this.props;

        if (isFetching) {
            return <div>Fetching</div>
        }

        return (
            <JogsContainer>
                {jogs.map((jog) => {
                    return <Jog key={jog.id} jog={jog}></Jog>
                })}
            </JogsContainer>  
        );
    }
}