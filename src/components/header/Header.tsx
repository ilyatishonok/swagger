import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import FilterIcon from './icons/FilterIcon';
import LogoIcon from './icons/LogoIcon';
import DropdownNav from './DropdownNav';
import HamburgerIcon from './icons/HamburgerIcon';
import Filter from './FilterConnector';

export interface IHeaderProps {
    isAuthenticated: boolean;
}

export interface IHeaderState {
    isFilterEnabled: boolean;
    isDropdownOpened: boolean;
}

const GlobalStyle = createGlobalStyle<{ isModalOpen: boolean}>`
    @media (max-width: 500px) {
        body {
            overflow: ${props => props.isModalOpen ? 'hidden' : 'auto' };
        }
    }
`;

const HeaderBar = styled.header<{ isDropDownOpened: boolean; theme: any }>`
    display: flex;
    top: 0;
    position: sticky;
    align-items: center;
    justify-content: space-between;
    background-color: ${ props => props.theme.main };
    z-index: 100000;
    height: 2.7rem;
    padding: 1rem;

    @media (max-width: 500px) {
        background-color: ${props => props.isDropDownOpened ? 'transparent' : props.theme.main };
    }
`;

const ActionBar = styled.div`
    display: flex;
    align-items: center;
`;
const NavigationLink = styled.li`
    margin-left: 0.5rem;
    margin-right: 1rem;
    font-size: 0.8rem;
    cursor: pointer;
    color: white;
`;

const Navigation = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;

    @media (max-width: 500px) {
        display: none;
    }
`;

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
    state = {
        isFilterEnabled: false,
        isDropdownOpened: false,
    };

    private openDropdown = () => {
        this.setState((state) => ({
            isDropdownOpened: !state.isDropdownOpened,
        }));
    }

    public renderActionBar() {
        return (
                <ActionBar>
                    <Navigation>
                        <NavigationLink>JOGS</NavigationLink>
                        <NavigationLink>INFO</NavigationLink>
                        <NavigationLink>CONTACT US</NavigationLink>
                    </Navigation>
                    <FilterIcon isActive={this.state.isFilterEnabled} onClick={() => {
                        this.setState((state) => ({
                            isFilterEnabled: !state.isFilterEnabled,
                        }));
                    }} hide={this.state.isDropdownOpened} />
                    <HamburgerIcon isOpened={this.state.isDropdownOpened} onClick={this.openDropdown} />
                </ActionBar>
        );
    }

    public render() {
        return (
            <>
                <GlobalStyle isModalOpen={this.state.isDropdownOpened} />
                <HeaderBar isDropDownOpened={this.state.isDropdownOpened}>
                    <LogoIcon reverse={this.state.isDropdownOpened} />
                    {this.props.isAuthenticated && this.renderActionBar()}
                </HeaderBar>
                { this.state.isFilterEnabled && <Filter />}
                <DropdownNav isOpened={this.state.isDropdownOpened} />
            </>
        );
    }
}
