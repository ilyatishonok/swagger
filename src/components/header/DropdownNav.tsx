import React from 'react';
import styled from 'styled-components';

export interface IDropdownNavProps {
    isOpened: boolean;
}

const DropdownArea = styled.ul`
    display: none;
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: fixed;
    top: 0;
    margin: 0;
    padding: 0;
    padding-top: 4.7rem;
    background: white;

    @media (max-width: 500px) {
        overflow-y: hidden;
        display: flex;
        align-items: center;

        body {
            overflow: hidden;
        }
    }
`;

const NavigationElement = styled.li``;


const DropdownNav = () => (
    <DropdownArea>
        <NavigationElement>JOGS</NavigationElement>
        <NavigationElement>INFO</NavigationElement>
        <NavigationElement>CONTACT US</NavigationElement>
    </DropdownArea>
);

export default DropdownNav;