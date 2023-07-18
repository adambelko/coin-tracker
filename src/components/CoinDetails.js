import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import LineChart from "./LineChart";
import Converter from "./Converter";
import TrendingCoins from "./TrendingCoins";

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
  justify-content: space-between;
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

const CoinDetails = ({ formatCoinPrice, trendingCoins }) => {
  const params = useLocation();
  const coinId = params.state;

  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
      )
      .then((response) => {
        setCoin(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [coinId]);

  console.log(coin);

  const colorizePercentageChange = (data) => {
    data = data.toFixed(2);
    if (data >= 0) {
      return <CoinPercentageChange>{data}%</CoinPercentageChange>;
    } else {
      return <CoinPercentageChange red="true">{data}%</CoinPercentageChange>;
    }
  };

  return (
    <Wrapper>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Crumbs>
            <StyledCrumbLink to="/">Cryptocurrencies</StyledCrumbLink>
            {">"}
            <StyledCrumbSpan>{coin.name}</StyledCrumbSpan>
          </Crumbs>
          <CoinInfoWrapper>
            <Rank>Rank #{coin.market_data.market_cap_rank}</Rank>
            <ImgNameTickerWrapper>
              <StyledCoinImg src={coin.image.small} />
              <StyledName>{coin.name}</StyledName>
              <StyledTicker>{coin.symbol.toUpperCase()}</StyledTicker>
            </ImgNameTickerWrapper>
            <CoinPriceWrapper>
              <CoinPrice>
                ${formatCoinPrice(coin.market_data.current_price.usd)}
              </CoinPrice>
              <PercentageChangeWrapper>
                {colorizePercentageChange(
                  coin.market_data.price_change_percentage_24h
                )}
              </PercentageChangeWrapper>
            </CoinPriceWrapper>
          </CoinInfoWrapper>
          <InnerWrapper>
            <WrapperChartConverter>
              <LineChart coinId={coin.id} />
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
                      <TableData>
                        ${formatCoinPrice(coin.market_data.current_price.usd)}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>Price Change (24h)</TableHeader>
                      <TableData>
                        {colorizePercentageChange(
                          coin.market_data.price_change_percentage_24h
                        )}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>24h Low / 24h High</TableHeader>
                      <TableData>
                        ${coin.market_data.low_24h.usd} / $
                        {coin.market_data.high_24h.usd}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>Circulating Supply</TableHeader>
                      <TableData>
                        {coin.market_data.circulating_supply.toLocaleString()}{" "}
                        {coin.symbol.toUpperCase()}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>Market Cap</TableHeader>
                      <TableData>
                        ${coin.market_data.market_cap.usd.toLocaleString()}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>Total Volume</TableHeader>
                      <TableData>
                        ${coin.market_data.total_volume.usd.toLocaleString()}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>ATH</TableHeader>
                      <TableData>${coin.market_data.ath.usd}</TableData>
                    </tr>
                    <tr>
                      <TableHeader>ATH Change</TableHeader>
                      <TableData>
                        {colorizePercentageChange(
                          coin.market_data.ath_change_percentage.usd
                        )}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>ATL</TableHeader>
                      <TableData>
                        ${coin.market_data.atl.usd.toFixed(2)}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader>ATL Change</TableHeader>
                      <TableData>
                        {colorizePercentageChange(
                          coin.market_data.atl_change_percentage.usd
                        )}
                      </TableData>
                    </tr>
                    <tr>
                      <TableHeader $borderBottom="false">
                        Market Rank
                      </TableHeader>
                      <TableData $borderBottom="false">
                        #{coin.market_data.market_cap_rank}
                      </TableData>
                    </tr>
                  </tbody>
                </table>
              </CoinStats>
            </CoinStatsWrapper>
          </InnerWrapper>
          <TrendingCoins trendingCoins={trendingCoins} />
        </>
      )}
    </Wrapper>
  );
};

export default CoinDetails;
