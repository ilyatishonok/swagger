import React from 'react';
import styled from 'styled-components';
import JogsList from '../../jogs-list';

const Page = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const JogsPage = () => (
    <Page>
        <JogsList />
    </Page>
);

export default JogsPage;