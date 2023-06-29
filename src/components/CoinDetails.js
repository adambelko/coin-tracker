import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 87%;
  max-width: 1400px;
  margin: auto;
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
`;

const CoinPrice = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const CoinDetails = () => {
  const coin = useLocation();
  console.log(coin);
  return (
    <Wrapper>
      <Crumbs>
        <StyledCrumbLink to="/">Cryptocurrencies</StyledCrumbLink>
        {">"}
        <StyledCrumbSpan>{coin.state.name}</StyledCrumbSpan>
      </Crumbs>
      <CoinInfoWrapper>
        <Rank>Rank #{coin.state.market_cap_rank}</Rank>
        <ImgNameTickerWrapper>
          <StyledCoinImg src={coin.state.image} />
          <StyledName>{coin.state.name}</StyledName>
          <StyledTicker>{coin.state.symbol.toUpperCase()}</StyledTicker>
        </ImgNameTickerWrapper>
        <CoinPriceWrapper>
          <CoinPrice>${coin.state.current_price}</CoinPrice>
        </CoinPriceWrapper>
      </CoinInfoWrapper>
    </Wrapper>
  );
};

export default CoinDetails;