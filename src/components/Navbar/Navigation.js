import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 87%;
    margin: auto;

    @media (max-width: 900px) {
        display: none;
    }
`;

const List = styled.ul`
    display: flex;
    gap: 2em;
    align-items: center;
    font-weight: 600;
`;

const WebsiteName = styled.h1`
    font-size: 1.5rem;
`;

const ListItem = styled.li`
    display: flex;
    &:hover {
        color: ${(props) => props.theme.hover.blue};
    }
`;

const NavigationLink = styled(NavLink)`
    color: ${(props) => props.theme.colors.black};
    text-decoration: none;
`;

const SearchInput = styled.input`
    background-color: ${(props) => props.theme.colors.greySecondary};
    width: 230px;
    padding: 1em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

const Navigation = () => {
    return (
        <NavbarContainer>
            <List>
                <NavigationLink to="/">
                    <WebsiteName>Crypto Tracker</WebsiteName>
                </NavigationLink>
                <NavigationLink to="/cryptocurrencies">
                    <ListItem>Cryptocurrencies</ListItem>
                </NavigationLink>
                <NavigationLink to="news">
                    <ListItem>News</ListItem>
                </NavigationLink>
                <NavigationLink to="portfolio">
                    <ListItem>Portfolio</ListItem>
                </NavigationLink>
            </List>
            <SearchInput placeholder="Search..."></SearchInput>
        </NavbarContainer>
    );
};

export default Navigation;
