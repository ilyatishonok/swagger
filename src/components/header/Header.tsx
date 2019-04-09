import React from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import styled, { createGlobalStyle } from 'styled-components';
import { ITheme } from "theme";
import FilterIcon from './icons/FilterIcon';
import LogoIcon from './icons/LogoIcon';
import DropdownNav from './DropdownNav';
import HamburgerIcon from './icons/HamburgerIcon';
import Filter from './FilterConnector';
import { NavLink } from "react-router-dom";

export interface IHeaderProps {
    isAuthenticated: boolean;
}

export interface IHeaderState {
    isFilterVisible: boolean;
    isDropdownOpened: boolean;
}

const GlobalStyle = createGlobalStyle<{ hideScroll: boolean}>`
    @media (max-width: 500px) {
        body {
            overflow: ${props => props.hideScroll ? 'hidden' : 'auto' };
        }
    }
`;

const HeaderBar = styled.header<{ isDropDownOpened: boolean; theme: ITheme }>`
    display: flex;
    top: 0;
    position: sticky;
    align-items: center;
    justify-content: space-between;
    background-color: ${ props => props.theme.main };
    z-index: 100;
    height: 2.7rem;
    padding: 1rem 1rem 1rem 0;

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
    
    & > a {
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
        route: `${process.env.PUBLIC_URL}/`,
    },
    {
        title: 'Info',
        route: `${process.env.PUBLIC_URL}/info`,
    },
    {
        title: 'Contact us',
        route: `${process.env.PUBLIC_URL}/contactus`,
    },
];

class Header extends React.Component<IHeaderProps & RouteComponentProps, IHeaderState> {
    state = {
        isFilterVisible: false,
        isDropdownOpened: false,
    };

    private setDropdownState = () => {
        this.setState((state) => ({
            isDropdownOpened: !state.isDropdownOpened,
        }));
    }

    private setFilterState = () => {
        this.setState((state) => ({
            isFilterVisible: !state.isFilterVisible,
        }));
    }

    public renderActionBar() {
        const { isFilterVisible, isDropdownOpened } = this.state;

        return (
            <ActionBar>
                <Navigation>
                    {navigations.map(({ title, route }) => (
                        <NavigationLink selected={this.props.location.pathname === route} key={title}>
                            <NavLink to={route}>{title}</NavLink>
                        </NavigationLink>
                    ))}
                </Navigation>
                {!isDropdownOpened && <FilterIcon isActive={isFilterVisible} onClick={this.setFilterState} />}
                <HamburgerIcon isActive={isDropdownOpened} onClick={this.setDropdownState} />
            </ActionBar>
        );
    }

    public render() {
        const { isDropdownOpened, isFilterVisible } = this.state;
        const { isAuthenticated, location } = this.props;

        return (
            <>
                <GlobalStyle hideScroll={isDropdownOpened} />
                <HeaderBar isDropDownOpened={isDropdownOpened}>
                    <LogoIcon reverse={isDropdownOpened} />
                    {isAuthenticated && this.renderActionBar()}
                </HeaderBar>
                {isFilterVisible && <Filter />}
                <DropdownNav
                    pathname={location.pathname}
                    isOpened={isDropdownOpened}
                    onClose={() => this.setState({
                        isDropdownOpened: false,
                    })}
                    navigationElements={navigations}
                />
            </>
        );
    }
}

export default withRouter(Header);