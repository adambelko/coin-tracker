import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { useState } from "react";

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

  img {
    height: 30px;
  }
`;

const SearchInput = styled.input`
  width: 230px;
  padding: 0.9em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.greySecondary};
`;

const SearchBoxExpanded = styled.div`
  position: fixed;
  z-index: 9999;
  visibility: visible;
  left: 0px;
  top: 0px;
  height: 300px;
  width: 400px;
  padding: 0.5em;
  border: solid 1px black;
  background-color: white;
  transform: translate3d(993px, 53px, 0px);
`;

const SearchBoxInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.4em;
  align-items: center;

  input {
    outline: none;
    height: 2.5em;
    width: 100%;
    font-size: 1.1rem;
    padding-left: 0.3em;
    /* border: none; */
  }
`;

const Navigation = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  return (
    <NavbarContainer>
      <List>
        <NavigationLink to="/">
          <WebsiteName>Crypto Tracker</WebsiteName>
        </NavigationLink>
        <NavigationLink to="/">
          <ListItem>Cryptocurrencies</ListItem>
        </NavigationLink>
        <NavigationLink to="news">
          <ListItem>News</ListItem>
        </NavigationLink>
      </List>
      <SearchInput
        placeholder="Search..."
        onClick={() => setSearchBoxOpen(true)}
      ></SearchInput>
      {searchBoxOpen && (
        <SearchBoxExpanded>
          <SearchBoxInputWrapper>
            <FiSearch size="20px" />
            <input placeholder="Search coin..." />
            <GrFormClose
              size="28px"
              style={{ cursor: "pointer" }}
              onClick={() => setSearchBoxOpen(false)}
            />
          </SearchBoxInputWrapper>
        </SearchBoxExpanded>
      )}
    </NavbarContainer>
  );
};

export default Navigation;
