import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import theme from "../styles/Theme";

const SubHeader = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.lightBlue};
  padding: 2em 0;
`;

const InformationPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 87%;
  margin: auto;
`;

const InformationTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
`;

const InformationValue = styled.p`
  display: flex;
`;

const TableWrapper = styled.div`
  overflow-x: scroll;
`;

const StyledTable = styled.table`
  width: 87%;
  margin: auto;
`;

const TableHeader = styled.th`
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};
  font-size: 0.8rem;
  padding: 0.8em 1em;
  font-weight: bold;
  text-align: ${(props) => (props.textalign ? "start" : "end")};
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue};
  }
`;

const TableCell = styled.td`
  padding: 1.5em 1em;
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};
  font-size: 0.9rem;
  text-align: ${(props) => (props.textalign ? "start" : "end")};
  color: ${(props) => props.color};
  white-space: nowrap;
`;

const StyledImage = styled.img`
  height: 24px;
  padding-right: 0.5em;
`;

const CellInnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  font-weight: bold;
`;

const StyledTicker = styled.span`
  color: ${(props) => props.theme.colors.darkBlue};
`;

const Home = ({ globalData }) => {
  const [marketData, setMarketData] = useState([]);
  const formatMarketCap = (number) => (number / 1e12).toFixed(2);

  const marketAPI =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h%2C%207d%2C&locale=en";

  useEffect(() => {
    axios
      .get(marketAPI)
      .then((response) => setMarketData(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(marketData);
  console.log(globalData);

  return (
    <React.Fragment>
      <SubHeader>
        <InformationPanel>
          <InformationTitle>
            Today's Cryptocurrency Prices by Market Cap
          </InformationTitle>
          <InformationValue>
            The global crypto market cap is $
            {globalData &&
              globalData.total_market_cap &&
              globalData.total_market_cap.usd &&
              formatMarketCap(globalData.total_market_cap.usd)}{" "}
            T, a 1.01% increase over the last day.
          </InformationValue>
        </InformationPanel>
      </SubHeader>
      <TableWrapper>
        <StyledTable>
          <thead>
            <TableRow>
              <TableHeader textalign="true">#</TableHeader>
              <TableHeader textalign="true">Name</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>1h%</TableHeader>
              <TableHeader>24h%</TableHeader>
              <TableHeader>Market Cap</TableHeader>
              <TableHeader>Circulating Supply</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {marketData &&
              marketData.map((coin, index) => (
                <TableRow key={coin.id}>
                  <TableCell color={theme.colors.darkBlue} textalign="true">
                    {index + 1}
                  </TableCell>
                  <TableCell textalign="true">
                    <CellInnerWrapper>
                      <StyledImage src={coin.image} />
                      <StyledSpan>{coin.name}</StyledSpan>
                      <StyledTicker>
                        &nbsp;{coin.symbol.toUpperCase()}
                      </StyledTicker>
                    </CellInnerWrapper>
                  </TableCell>
                  <TableCell>${coin.current_price.toLocaleString()}</TableCell>
                  <TableCell>
                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                  <TableCell>
                    {coin.circulating_supply.toLocaleString()}{" "}
                    {coin.symbol.toUpperCase()}
                  </TableCell>
                </TableRow>
              ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </React.Fragment>
  );
};

export default Home;
