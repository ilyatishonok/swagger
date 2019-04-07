import React from 'react';
import styled from 'styled-components';

export interface IHamburgerProps {
    isOpened: boolean;
    onClick?: () => void;
}

const StyledHamburger = styled.svg`
    display: none;
    cursor: pointer;

    @media (max-width: 500px) {
        display: block;
    }
`;

const HamburgerIcon = (props: IHamburgerProps) => {
    if (props.isOpened) {
        return (
            <StyledHamburger onClick={props.onClick} height="32px" version="1.1" viewBox="0 0 32 32" width="32px">
                <g>
                    <rect fill="none" height="32" width="32" />
                </g>
                <g>
                    <polygon points="2,26 6,30 16,20 26,30 30,26 20,16 30,6 26,2 16,12 6,2 2,6 12,16  " />
                </g>
            </StyledHamburger>
        );
    }

    return (
        <StyledHamburger onClick={props.onClick} height="32px" viewBox="0 0 32 32" width="32px">
            <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
        </StyledHamburger>
    )
}

export default HamburgerIcon;