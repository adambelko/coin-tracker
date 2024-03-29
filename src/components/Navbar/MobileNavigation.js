import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  width: 87%;
  margin: auto;
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
  gap: 1em;
  align-items: center;
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
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 4em;
  background-color: white;
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
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.9em;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.greySecondary};
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
          <WebsiteName>Coin Tracker</WebsiteName>
        </NavigationLink>
        <NavigationRightWrapper>
          <StyledElement>Mode</StyledElement>
          <StyledElement>USD</StyledElement>
          {openMenu ? closeIcon : menuIcon}
          {openMenu && (
            <List>
              <NavigationLink to="/">
                <ListItem>Cryptocurrencies</ListItem>
              </NavigationLink>
              <NavigationLink to="news">
                <ListItem>News</ListItem>
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
