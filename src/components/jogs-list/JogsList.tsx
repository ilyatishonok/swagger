import React from 'react';
import styled from 'styled-components';
import { JogEntity } from '../../reducers/entities/jogs';
import Jog from './Jog';

export interface IJogsListProps {
    isFetching: boolean;
    isVisible: boolean;
    jogs: JogEntity[];
    error?: string;
    fetchJogs: () => void;
}

const JogsContainer = styled.ul<{ isVisible: boolean }>`
    list-style: none;
    display: ${ props => props.isVisible ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
`;

export default class JogsList extends React.PureComponent<IJogsListProps> {
    componentDidMount() {
        this.props.fetchJogs();
    }

    render() {
        const { isFetching, error, jogs } = this.props;

        if (isFetching) {
            return <div>Fetching</div>
        }

        return (
            <JogsContainer isVisible={this.props.isVisible}>
                {jogs.map((jog) => {
                    return <Jog key={jog.id} jog={jog}></Jog>
                })}
            </JogsContainer>  
        );
    }
}