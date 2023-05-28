import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 87%;
  margin: auto;
  align-items: center;
  display: none;
  @media (max-width: 900px) {
    display: flex;
  }
`;

const NavigationWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const NavigationRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const StyledElement = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.grey};
  cursor: ${(props) => (props.pointer ? "pointer" : "auto")};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  gap: 2em;
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 4em;
  left: 0;
`;

const WebsiteName = styled.h1`
  white-space: nowrap;
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
  width: 100%;
  padding: 0.8em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const MobileNavigation = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuIcon = (
    <GiHamburgerMenu size="25px" onClick={() => setOpenMenu(!openMenu)} />
  );

  const closeIcon = (
    <IoMdCloseCircleOutline
      size="25px"
      onClick={() => setOpenMenu(!openMenu)}
    />
  );

  return (
    <Navigation>
      <NavigationWrapper>
        <NavigationLink to="/">
          <WebsiteName>Crypto Tracker</WebsiteName>
        </NavigationLink>
        <NavigationRightWrapper>
          <StyledElement>Mode</StyledElement>
          <StyledElement>USD</StyledElement>
          {openMenu ? closeIcon : menuIcon}
          {openMenu && (
            <List>
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
          )}
        </NavigationRightWrapper>
      </NavigationWrapper>
      <SearchInput placeholder="Search..." />
    </Navigation>
  );
};

export default MobileNavigation;
