import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin: auto;
`;

const StyledList = styled.ul`
    display: flex;
    gap: 2em;
    align-items: center;
    font-weight: 600;
`;

const WebsiteName = styled.h1`
    font-size: 1.5rem;
`;

const StyledListItem = styled.li`
    display: flex;
    &:hover {
        color: #4789f7;
    }
`;

const NavigationLink = styled(NavLink)`
    color: #212532;
    text-decoration: none;
`;

const SearchInput = styled.input`
    background-color: #eff2f5;
    width: 230px;
    padding: 1em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

const Navlinks = () => {
    return (
        <NavbarContainer>
            <StyledList>
                <NavigationLink to="/">
                    <WebsiteName>Crypto Tracker</WebsiteName>
                </NavigationLink>
                <NavigationLink to="/cryptocurrencies">
                    <StyledListItem>Cryptocurrencies</StyledListItem>
                </NavigationLink>
                <NavigationLink to="news">
                    <StyledListItem>News</StyledListItem>
                </NavigationLink>
                <NavigationLink to="portfolio">
                    <StyledListItem>Portfolio</StyledListItem>
                </NavigationLink>
            </StyledList>
            <SearchInput placeholder="Search..."></SearchInput>
        </NavbarContainer>
    );
};

export default Navlinks;
