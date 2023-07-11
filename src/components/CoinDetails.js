import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import LineChart from "./LineChart";

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

const CoinPercentageChange = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.red ? "red" : props.theme.colors.green)};
`;

const InnerWrapper = styled.div`
  display: flex;
  min-height: 600px;
  margin-top: 3em;
  gap: 0.5em;
`;

const CoinStats = styled.div`
  display: flex;
  width: 400px;
  margin-top: 3.5em;
  background: ${(props) => props.theme.colors.greySecondary};
  border-radius: 15px;
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
          {colorizePercentageChange(coin.price_change_percentage_24h)}
        </CoinPriceWrapper>
      </CoinInfoWrapper>
      <InnerWrapper>
        <LineChart coin={coin} />
        <CoinStats></CoinStats>
      </InnerWrapper>
    </Wrapper>
  );
};

export default CoinDetails;
