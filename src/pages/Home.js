import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const TableHeaderGroup = styled.thead``;
const TableBodyGroup = styled.tbody``;
const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 1.6em 0;
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};
`;

const TableHeader = styled.th`
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};
  font-size: 0.8rem;
  padding: 0.8em 0;
  font-weight: 600;
  text-align: start;
`;

const Home = () => {
  const [data, setData] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h%2C%207d%2C&locale=en";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  return (
    <React.Fragment>
      <SubHeader>
        <InformationPanel>
          <InformationTitle>
            Today's Cryptocurrency Prices by Market Cap
          </InformationTitle>
          <InformationValue>
            The global crypto market cap is $1.12T, a 1.01% increase over the
            last day.
          </InformationValue>
        </InformationPanel>
      </SubHeader>
      <TableWrapper>
        <StyledTable>
          <TableHeaderGroup>
            <TableRow>
              <TableHeader>#</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>1h%</TableHeader>
              <TableHeader>24h%</TableHeader>
              <TableHeader>Market Cap</TableHeader>
              <TableHeader>Circulating Supply</TableHeader>
            </TableRow>
          </TableHeaderGroup>
          <TableBodyGroup>
            {data.map((coin, index) => (
              <TableRow key={coin.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{coin.name}</TableCell>
                <TableCell>${coin.current_price.toLocaleString()}</TableCell>
                <TableCell>
                  {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
                <TableCell>{coin.market_cap}</TableCell>
                <TableCell>
                  {coin.circulating_supply} {coin.symbol.toUpperCase()}
                </TableCell>
              </TableRow>
            ))}
          </TableBodyGroup>
        </StyledTable>
      </TableWrapper>
    </React.Fragment>
  );
};

export default Home;
