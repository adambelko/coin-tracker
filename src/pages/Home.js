import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

import Dropdown from "../components/TableManager/Dropdown";
import TableManager from "../components/TableManager/TableManager";
import Newsletter from "../components/Newsletter";

const Wrapper = styled.div`
  background: linear-gradient(
    rgb(248, 250, 255) 0%,
    rgba(248, 250, 253, 0) 200px
  );
`;

const SubWrapper = styled.div`
  width: 87%;
  max-width: 1400px;
  margin: auto;
`;

const SubHeader = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2em 0;
`;

const InformationPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const InformationTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 600;
`;

const InformationDescription = styled.p`
  display: flex;
  color: ${(props) => props.theme.colors.darkBlue};

  div {
    display: flex;
    align-items: center;
    padding-top: 0.5em;
  }
`;

const TableWrapper = styled.div`
  overflow-x: scroll;
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const TableHeader = styled.th`
  padding: 0.8em 1em;
  font-weight: bold;
  font-size: 0.8rem;
  text-align: ${(props) => (props.textalign ? "start" : "end")};
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) =>
      props.nobg ? "#FFFFFF" : props.theme.colors.lightBlue};
  }
`;

const TableCell = styled.td`
  padding: 1.8em 1em;
  color: "#ffffff";
  white-space: nowrap;
  text-align: ${(props) => (props.textalign ? "start" : "end")};
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};
`;

const TableChartCell = styled(TableCell)`
  width: 150px;
  padding: 0 0.5em 0 1em;
`;

const TopTableManager = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1em;
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
  font-weight: ${(props) => props.$bold || "400"};
  span {
    color: ${(props) => props.theme.colors.darkBlue};
    font-weight: 400;
  }
`;

const ChangeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledChange = styled(StyledSpan)`
  color: ${(props) => (props.red ? "red" : props.theme.colors.green)};
`;

const StyledTicker = styled.span`
  color: ${(props) => props.theme.colors.darkBlue};
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.darkBlue};
  text-decoration: none;
  cursor: pointer;
`;

const Home = ({ globalData, formatCoinPrice }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [marketData, setMarketData] = useState([]);

  const formatMarketCap = (number) => (number / 1e12).toFixed(2);

  const colorizeMarketCap = (data) => {
    data = data.toFixed(2);
    if (data < 0)
      return (
        <StyledChange $bold="bold" red="true">
          {data}% <span>decrease</span>
        </StyledChange>
      );
    if (data > 0)
      return (
        <StyledChange $bold="bold">
          {data}% <span>increase</span>
        </StyledChange>
      );
    return (
      <StyledSpan $bold="bold">
        {data}% <span>change</span>
      </StyledSpan>
    );
  };

  const colorizePercentageChange = (data) => {
    data = data.toFixed(2);
    if (data < 0)
      return (
        <ChangeWrapper>
          <MdArrowDropDown size="20px" color="red" />
          <StyledChange red="true">{Math.abs(data)}%</StyledChange>
        </ChangeWrapper>
      );
    if (data >= 0)
      return (
        <ChangeWrapper>
          <MdArrowDropUp size="20px" color="#18C785" />
          <StyledChange>{data}%</StyledChange>
        </ChangeWrapper>
      );
  };

  const marketAPI = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`;

  useEffect(() => {
    axios
      .get(marketAPI)
      .then((response) => setMarketData(response.data))
      .catch((error) => console.log(error));
  }, [page, perPage]);

  console.log(marketData);

  return (
    <Wrapper>
      <SubWrapper>
        <SubHeader>
          <InformationPanel>
            <InformationTitle>
              Today's Cryptocurrency Prices by Market Cap
            </InformationTitle>
            <InformationDescription>
              <div>
                The global crypto market cap is
                {globalData &&
                  globalData.total_market_cap &&
                  globalData.total_market_cap.usd && (
                    <StyledSpan $bold="bold">
                      &nbsp;${formatMarketCap(globalData.total_market_cap.usd)}T
                    </StyledSpan>
                  )}
                , a&nbsp;
                {globalData.market_cap_change_percentage_24h_usd &&
                  colorizeMarketCap(
                    globalData.market_cap_change_percentage_24h_usd
                  )}
                &nbsp; over the last day
              </div>
            </InformationDescription>
          </InformationPanel>
        </SubHeader>
        <TopTableManager>
          <Dropdown perPage={perPage} setPerPage={setPerPage} />
        </TopTableManager>
        <TableWrapper>
          <StyledTable>
            <thead>
              <TableRow nobg="true">
                <TableHeader textalign="true">#</TableHeader>
                <TableHeader textalign="true">Name</TableHeader>
                <TableHeader>Price</TableHeader>
                <TableHeader>1h %</TableHeader>
                <TableHeader>24h %</TableHeader>
                <TableHeader>7d %</TableHeader>
                <TableHeader>Market Cap</TableHeader>
                <TableHeader>Circulating Supply</TableHeader>
                <TableHeader>Last 7 Days</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {marketData &&
                marketData.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell textalign="true">
                      {coin.market_cap_rank}
                    </TableCell>
                    <TableCell textalign="true">
                      <CellInnerWrapper>
                        <StyledLink to={"/currencies/" + coin.id} state={coin}>
                          <StyledImage src={coin.image} />
                          <StyledSpan $bold="bold">{coin.name}</StyledSpan>
                          <StyledTicker>
                            &nbsp;{coin.symbol.toUpperCase()}
                          </StyledTicker>
                        </StyledLink>
                      </CellInnerWrapper>
                    </TableCell>
                    <TableCell>
                      {coin.current_price
                        ? `$${formatCoinPrice(coin.current_price)}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {coin.price_change_percentage_1h_in_currency
                        ? colorizePercentageChange(
                            coin.price_change_percentage_1h_in_currency
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {coin.price_change_percentage_24h
                        ? colorizePercentageChange(
                            coin.price_change_percentage_24h
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {coin.price_change_percentage_24h
                        ? colorizePercentageChange(
                            coin.price_change_percentage_7d_in_currency
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {coin.market_cap
                        ? `$${coin.market_cap.toLocaleString()}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {coin.circulating_supply && coin.symbol
                        ? `${coin.circulating_supply.toLocaleString()}  ${coin.symbol.toUpperCase()}`
                        : "-"}
                    </TableCell>
                    <TableChartCell>
                      <Sparklines data={coin.sparkline_in_7d.price}>
                        <SparklinesLine color="blue" />
                      </Sparklines>
                    </TableChartCell>
                  </TableRow>
                ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </SubWrapper>
      <TableManager
        marketData={marketData}
        globalData={globalData}
        perPage={perPage}
        page={page}
        setPage={setPage}
        setPerPage={setPerPage}
      />
      <Newsletter />
    </Wrapper>
  );
};

export default Home;
