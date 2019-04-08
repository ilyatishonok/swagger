import React from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import styled, { createGlobalStyle } from 'styled-components';
import FilterIcon from './icons/FilterIcon';
import LogoIcon from './icons/LogoIcon';
import DropdownNav from './DropdownNav';
import HamburgerIcon from './icons/HamburgerIcon';
import Filter from './FilterConnector';
import {NavLink} from "react-router-dom";

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
    z-index: 100;
    height: 2.7rem;
    padding: 1rem 1rem 1rem 0;
    width: 100%;

    @media (max-width: 500px) {
        background-color: ${props => props.isDropDownOpened ? 'transparent' : props.theme.main };
    }
`;

const ActionBar = styled.div`
    display: flex;
    align-items: center;
`;
const NavigationLink = styled.li<{ selected?: boolean }>`
    margin-left: 0.5rem;
    margin-right: 1rem;
    font-size: ${ props => props.selected ? '0.9rem' : '0.7rem' }
    cursor: pointer;
    
    & > {
        color: ${ props => props.selected ? 'black' : 'white' }
        text-decoration: none;
    }
`;

const Navigation = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;

    @media (max-width: 500px) {
        display: none;
    }
`;

const navigations = [
    {
        title: 'Jogs',
        route: '/',
    },
    {
        title: 'Info',
        route: '/info',
    },
    {
        title: 'Contact us',
        route: '/contactus',
    },
];

class Header extends React.Component<IHeaderProps & RouteComponentProps, IHeaderState> {
    state = {
        isFilterEnabled: false,
        isDropdownOpened: false,
    };

    private openDropdown = () => {
        this.setState((state) => ({
            isDropdownOpened: !state.isDropdownOpened,
        }));
    }

    private onCloseDropDown = () => {
        this.setState({
            isDropdownOpened: false,
        });
    }

    public renderActionBar() {
        return (
                <ActionBar>
                    <Navigation>
                        {navigations.map(({ title, route }) => (
                            <NavigationLink selected={this.props.location.pathname === route} key={title}>
                                <NavLink to={route}>{title}</NavLink>
                            </NavigationLink>
                        ))}
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
                <DropdownNav onClose={this.onCloseDropDown} navigationElements={navigations} isOpened={this.state.isDropdownOpened} />
            </>
        );
    }
}

export default withRouter(Header);