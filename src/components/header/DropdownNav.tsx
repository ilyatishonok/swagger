import React from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { ITheme } from "theme";

export interface IDropdownNavProps {
    navigationElements: {
        title: string;
        route: string;
    }[];
    pathname: string;
    isOpened: boolean;
    onClose: () => void;
}

const DropdownArea = styled.div<{ isVisible: boolean }>`
    width: 100%;
    height: 100%;
    z-index: 99;
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

const NavigationElement = styled.li<{ selected?: boolean, theme: ITheme}>`
    font-size: 1.2rem;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
    
    &>a {
        color: ${ props => props.selected ? props.theme.main : 'black' };
        text-decoration: none;
    }
`;


const DropdownNav = (props: IDropdownNavProps) => (
    <DropdownArea isVisible={props.isOpened}>
        <NavLinks>
            {props.navigationElements.map((({ route, title}) => {
                return (
                    <NavigationElement selected={props.pathname === route} key={title}>
                        <NavLink onClick={props.onClose} to={route}>{title}</NavLink>
                    </NavigationElement>
                )
            }))}
        </NavLinks>
    </DropdownArea>
);

export default DropdownNav;
