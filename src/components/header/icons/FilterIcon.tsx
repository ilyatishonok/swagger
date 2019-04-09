import React from 'react';
import styled from 'styled-components';

export interface IFilterIconProps {
    isActive: boolean;
    onClick: () => void;
}

const StyledFilterIcon = styled.svg<{ isActive: boolean; }>`
    display: block;
    cursor: pointer;

    @media (max-width: 500px) {
        margin-right: 1rem;
    }
`;

const FilterIcon = (props: IFilterIconProps) => (
    <StyledFilterIcon isActive={props.isActive} onClick={props.onClick} width="29" height="29" viewBox="0 0 39 39">
        <g fill="none" fillRule="evenodd">
            <path fill={props.isActive ? 'white' : '#62AA14'} d="M32.814 8.83c-.209-.478-.57-.717-1.086-.717H8.195c-.514 0-.876.24-1.084.717-.209.503-.123.932.257 1.287l9.064 9.064v8.935c0 .32.117.595.35.828l4.706 4.706c.22.233.497.35.827.35.148 0 .3-.03.46-.092.478-.209.717-.57.717-1.085V19.181l9.064-9.064c.38-.355.466-.784.258-1.287z"/>
            <rect width="37" height="37" x="1" y="1" stroke={props.isActive ? 'white' : '#62AA14'} strokeWidth="2" rx="6"/>
        </g>
    </StyledFilterIcon>
);

export default FilterIcon;
