import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 87%;
  max-width: 1400px;
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
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};
`;

const SearchInput = styled.input`
  width: 230px;
  padding: 0.9em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.greySecondary};
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
