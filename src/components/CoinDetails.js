import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import LineChart from "./LineChart";
import Converter from "./Converter";

const Wrapper = styled.div`
  width: 87%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Crumbs = styled.div`
  display: flex;
  margin-top: 4em;
`;

const StyledCrumbLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.blue};
  margin-right: 0.8em;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledCrumbSpan = styled.span`
  margin-left: 0.8em;
  color: ${(props) => props.theme.colors.darkBlue};
`;

const CoinInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

const Rank = styled.div`
  font-size: 0.9rem;
  background-color: black;
  color: white;
  width: fit-content;
  padding: 0.3em 0.8em;
  border-radius: 7px;
`;

const ImgNameTickerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.8em;
`;

const StyledCoinImg = styled.img`
  height: 30px;
`;

const StyledName = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  margin-left: 0.3em;
`;

const StyledTicker = styled.span`
  font-size: 1.3rem;
  margin-left: 0.5em;
  color: ${(props) => props.theme.colors.darkBlue};
`;

const CoinPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.6em;
  gap: 0.5em;
`;

const CoinPrice = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
`;

const PercentageChangeWrapper = styled.div`
  font-size: 1.5rem;
`;

const CoinPercentageChange = styled.span`
  font-weight: bold;
  color: ${(props) => (props.red ? "red" : props.theme.colors.green)};
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
  gap: 0.5em;
`;

const WrapperChartConverter = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CoinStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
`;

const CoinStatHeader = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const CoinStats = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.7em;
  padding: 2.5em;
  background: #f8fafd;
  border-radius: 15px;
  font-size: 0.9rem;
  table {
    border-collapse: collapse;
  }
`;

const TableCaption = styled.div`
  margin-bottom: 0.6em;
  color: #808a9d;
`;

const TableHeader = styled.th`
  text-align: start;
  font-weight: 500;
  color: #58667e;
  white-space: nowrap;
  padding: 1.3em 0;
  border-top: 1px solid #eff2f5;
  border-bottom: ${(props) =>
    props.$borderBottom ? "none" : "1px solid #eff2f5"};
`;

const TableData = styled.td`
  text-align: end;
  font-weight: bold;
  border-top: 1px solid #eff2f5;
  border-bottom: ${(props) =>
    props.$borderBottom ? "none" : "1px solid #eff2f5"};
`;

const CoinDetails = ({ formatCoinPrice }) => {
  const coinData = useLocation();
  const coin = coinData.state;

  const colorizePercentageChange = (data) => {
    data = data.toFixed(2);
    if (data >= 0) {
      return <CoinPercentageChange>{data}%</CoinPercentageChange>;
    } else {
      return <CoinPercentageChange red="true">{data}%</CoinPercentageChange>;
    }
  };

  console.log(coin);

  return (
    <Wrapper>
      <Crumbs>
        <StyledCrumbLink to="/">Cryptocurrencies</StyledCrumbLink>
        {">"}
        <StyledCrumbSpan>{coin.name}</StyledCrumbSpan>
      </Crumbs>
      <CoinInfoWrapper>
        <Rank>Rank #{coin.market_cap_rank}</Rank>
        <ImgNameTickerWrapper>
          <StyledCoinImg src={coin.image} />
          <StyledName>{coin.name}</StyledName>
          <StyledTicker>{coin.symbol.toUpperCase()}</StyledTicker>
        </ImgNameTickerWrapper>
        <CoinPriceWrapper>
          <CoinPrice>${formatCoinPrice(coin.current_price)}</CoinPrice>
          <PercentageChangeWrapper>
            {colorizePercentageChange(coin.price_change_percentage_24h)}
          </PercentageChangeWrapper>
        </CoinPriceWrapper>
      </CoinInfoWrapper>
      <InnerWrapper>
        <WrapperChartConverter>
          <LineChart coin={coin} />
          <Converter coin={coin} />
        </WrapperChartConverter>
        <CoinStatsWrapper>
          <CoinStatHeader>
            {coin.symbol.toUpperCase()} Price Statistics
          </CoinStatHeader>
          <CoinStats>
            <table>
              <TableCaption>{coin.name} Price Today</TableCaption>
              <tbody>
                <tr>
                  <TableHeader>{coin.name} Price</TableHeader>
                  <TableData>${formatCoinPrice(coin.current_price)}</TableData>
                </tr>
                <tr>
                  <TableHeader>Price Change (24h)</TableHeader>
                  <TableData>
                    {colorizePercentageChange(coin.price_change_percentage_24h)}
                  </TableData>
                </tr>
                <tr>
                  <TableHeader>24h Low / 24h High</TableHeader>
                  <TableData>
                    ${coin.low_24h} / ${coin.high_24h}
                  </TableData>
                </tr>
                <tr>
                  <TableHeader>Circulating Supply</TableHeader>
                  <TableData>
                    {coin.circulating_supply.toLocaleString()}{" "}
                    {coin.symbol.toUpperCase()}
                  </TableData>
                </tr>
                <tr>
                  <TableHeader>Market Cap</TableHeader>
                  <TableData>${coin.market_cap.toLocaleString()}</TableData>
                </tr>
                <tr>
                  <TableHeader>Total Volume</TableHeader>
                  <TableData>${coin.total_volume.toLocaleString()}</TableData>
                </tr>
                <tr>
                  <TableHeader>ATH</TableHeader>
                  <TableData>${coin.ath}</TableData>
                </tr>
                <tr>
                  <TableHeader>ATH Change</TableHeader>
                  <TableData>
                    {colorizePercentageChange(coin.ath_change_percentage)}
                  </TableData>
                </tr>
                <tr>
                  <TableHeader>ATL</TableHeader>
                  <TableData>${coin.atl.toFixed(2)}</TableData>
                </tr>
                <tr>
                  <TableHeader>ATL Change</TableHeader>
                  <TableData>
                    {colorizePercentageChange(coin.atl_change_percentage)}
                  </TableData>
                </tr>
                <tr>
                  <TableHeader $borderBottom="false">Market Rank</TableHeader>
                  <TableData $borderBottom="false">
                    #{coin.market_cap_rank}
                  </TableData>
                </tr>
              </tbody>
            </table>
          </CoinStats>
        </CoinStatsWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default CoinDetails;
