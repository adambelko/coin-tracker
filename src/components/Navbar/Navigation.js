import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import { NavLink, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  background-color: ${(props) => props.theme.colors.greySecondary};
  cursor: pointer;
`;

const SearchBoxWrapper = styled.div`
  position: relative;
`;

const SearchBoxExpanded = styled.div`
  position: absolute;
  z-index: 9999;
  visibility: visible;
  left: -150px;
  top: -10px;
  width: 400px;
  max-height: 374px;
  overflow-y: auto;
  padding: 0.7em;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(128, 138, 157, 0.12),
    0px 8px 32px rgba(128, 138, 157, 0.24);
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
    border: none;
  }
`;

const SearchBoxResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.3em;
`;

const SearchBoxCategory = styled.div`
  color: #808a9d;
`;

const SearchBoxResult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.8em;
  border-radius: 8px;
  cursor: pointer;
  img {
    height: 20px;
  }
  &:hover {
    background-color: #f8fafd;
  }
`;

const SearchBoxResultCoinName = styled.div`
  font-weight: bold;
  color: #222531;
`;

const SearchBoxResultTicker = styled.div`
  color: #58867e;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Navigation = ({ trendingCoins }) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/search?query=${searchValue}`)
      .then((response) => setSearchResult(response.data))
      .catch((error) => console.log(error));
  }, [searchValue]);

  const handleCloseSearchBox = () => {
    setSearchValue(null);
    setSearchBoxOpen(false);
  };

  console.log(searchValue);
  return (
    <NavbarContainer>
      <List>
        <NavigationLink to="/">
          <WebsiteName>Coin Tracker</WebsiteName>
        </NavigationLink>
        <NavigationLink to="/">
          <ListItem>Cryptocurrencies</ListItem>
        </NavigationLink>
        <NavigationLink to="news">
          <ListItem>News</ListItem>
        </NavigationLink>
      </List>
      <SearchBoxWrapper>
        <SearchInput
          placeholder="Search..."
          onClick={() => setSearchBoxOpen(true)}
        ></SearchInput>
        {searchBoxOpen && (
          <SearchBoxExpanded>
            <SearchBoxInputWrapper>
              <FiSearch size="20px" />
              <input
                value={searchValue}
                placeholder="Search coin..."
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <GrFormClose
                size="28px"
                style={{ cursor: "pointer" }}
                onClick={handleCloseSearchBox}
              />
            </SearchBoxInputWrapper>
            <SearchBoxResultsWrapper>
              {searchValue === null ? (
                <React.Fragment>
                  <SearchBoxCategory>Trending</SearchBoxCategory>
                  {trendingCoins.coins &&
                    trendingCoins.coins.map((coin) => (
                      <StyledLink
                        to={"/currencies/" + coin.item.id}
                        state={coin.item.id}
                        onClick={() => setSearchBoxOpen(false)}
                      >
                        <SearchBoxResult>
                          <img src={coin.item.small} alt="" />
                          <SearchBoxResultCoinName>
                            {coin.item.name}
                          </SearchBoxResultCoinName>
                          <SearchBoxResultTicker>
                            {coin.item.symbol}
                          </SearchBoxResultTicker>
                        </SearchBoxResult>
                      </StyledLink>
                    ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <SearchBoxCategory>Cryptoassets</SearchBoxCategory>
                  {searchResult &&
                    searchResult.coins.map((coin) => (
                      <StyledLink
                        to={"/currencies/" + coin.id}
                        state={coin.id}
                        onClick={() => setSearchBoxOpen(false)}
                      >
                        <SearchBoxResult>
                          <img src={coin.thumb} alt="" />
                          <SearchBoxResultCoinName>
                            {coin.name}
                          </SearchBoxResultCoinName>
                          <SearchBoxResultTicker>
                            {coin.symbol}
                          </SearchBoxResultTicker>
                        </SearchBoxResult>
                      </StyledLink>
                    ))}
                </React.Fragment>
              )}
            </SearchBoxResultsWrapper>
          </SearchBoxExpanded>
        )}
      </SearchBoxWrapper>
    </NavbarContainer>
  );
};

export default Navigation;
