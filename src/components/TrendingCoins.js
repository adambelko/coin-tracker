import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Sparklines, SparklinesLine } from "react-sparklines";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  white-space: nowrap;
  padding: 1px;
  min-height: 215px;
  margin-top: 3em;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const CoinList = styled.div`
  display: flex;
  gap: 1em;
  margin-top: 0.5em;
`;

const TrendingCoin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  width: 210px;
  padding: 1.8em;
  border-radius: 16px;
  box-shadow: rgba(88, 102, 126, 0.08) 0px 4px 24px,
    rgba(88, 102, 126, 0.12) 0px 1px 2px;
  cursor: pointer;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 32px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 0.2em;
    gap: 0.3em;
  }
`;

const CoinName = styled.div`
  color: #58667e;
`;

const CoinPrice = styled.div`
  font-size: 1.1em;
  font-weight: bold;
`;

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState();
  const [coinDetails, setCoinDetails] = useState({});

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => setTrendingCoins(response.data))
      .catch((error) => console.log(error));
  }, []);

  const fetchCoinDetails = (coinId) => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true`
      )
      .then((response) => {
        setCoinDetails((prevCoinDetails) => ({
          ...prevCoinDetails,
          [coinId]: response.data,
        }));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (trendingCoins && trendingCoins.coins) {
      trendingCoins.coins.forEach((coin) => {
        fetchCoinDetails(coin.item.id);
      });
    }
  }, [trendingCoins]);

  return (
    <Wrapper>
      <Title>Trending Coins</Title>
      <CoinList>
        {trendingCoins &&
          trendingCoins.coins &&
          trendingCoins.coins.map((coin) => {
            return (
              <Link to={"/currencies/" + coin.item.id} state={coin.item.id}>
                <TrendingCoin key={coin.item.id}>
                  <TopWrapper>
                    <img src={coin.item.small} alt="coin" />
                    <div>
                      <CoinName>{coin.item.name}</CoinName>
                      <CoinPrice>
                        $
                        {coinDetails[
                          coin.item.id
                        ]?.market_data?.current_price?.usd?.toFixed(2)}
                      </CoinPrice>
                    </div>
                  </TopWrapper>
                  <Sparklines
                    data={
                      coinDetails[coin.item.id]?.market_data?.sparkline_7d
                        ?.price
                    }
                  >
                    <SparklinesLine color="#4789f7" />
                  </Sparklines>
                </TrendingCoin>
              </Link>
            );
          })}
      </CoinList>
    </Wrapper>
  );
};

export default TrendingCoins;
