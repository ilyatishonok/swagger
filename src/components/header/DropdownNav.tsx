import React from 'react';
import styled from 'styled-components';

export interface IDropdownNavProps {
    isOpened: boolean;
}

const DropdownArea = styled.div<{ isVisible: boolean }>`
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: fixed;
    top: 0;
    margin: 0;
    padding: 0;
    padding-top: 4.7rem;
    background: white;
    visibility: hidden;
    opacity: 0;

    @media (max-width: 500px) {
        display: flex;
        visibility: ${props => props.isVisible ? 'visible' : 'hidden' };
        opacity: ${props => props.isVisible ? '1' : '0' };
        align-items: center;
        flex-direction: column;
    }
`;

const NavLinks = styled.ul`
    text-align: center;
    list-style: none;
    margin-top: 5rem;
    padding: 0;
`;

const NavigationElement = styled.li<{ selected?: boolean, theme: any}>`
    font-size: 1.2rem;
    margin-top: 1rem;
    cursor: pointer;
    color: ${ props => props.selected ? props.theme.main : 'black' };

    &:hover {
        text-decoration: underline;
    }
`;


const DropdownNav = (props: IDropdownNavProps) => (
    <DropdownArea isVisible={props.isOpened}>
        <NavLinks>
            <NavigationElement>JOGS</NavigationElement>
            <NavigationElement selected>INFO</NavigationElement>
            <NavigationElement>CONTACT US</NavigationElement>
        </NavLinks>
    </DropdownArea>
);

export default DropdownNav;