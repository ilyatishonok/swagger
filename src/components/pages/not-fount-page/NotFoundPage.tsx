import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
    margin: auto;
    margin-top: 5rem;
`;

const TextMessage = styled.h3`
    color: ${ props => props.theme.gray };;
    text-align: center
`;

const NotFoundPage = () => (
    <Page>
        <img src={process.env.PUBLIC_URL + '/sad.svg'} />
        <TextMessage>Nothing is here</TextMessage>
    </Page>
);

export default NotFoundPage;