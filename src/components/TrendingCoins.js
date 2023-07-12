import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 1px;
  min-height: 215px;
  margin-top: 3em;
`;

const CoinList = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const TrendingCoin = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.1em;
  border-radius: 16px;
  box-shadow: rgba(88, 102, 126, 0.08) 0px 4px 24px,
    rgba(88, 102, 126, 0.12) 0px 1px 2px;
  cursor: pointer;
`;

const TopWrapper = styled.div`
  display: flex;
  img {
    height: 32px;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState();
  const [coinDetails, setCoinDetails] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => setTrendingCoins(response.data))
      .catch((error) => console.log(error));
  }, []);

  const fetchCoinDetails = (coinId) => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((response) => {
        setCoinDetails((prevCoinDetails) => [
          ...prevCoinDetails,
          response.data,
        ]);
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

  console.log(coinDetails);
  // console.log(trendingCoins);
  return (
    <Wrapper>
      <Title>Trending Coins</Title>
      <CoinList>
        {trendingCoins &&
          trendingCoins.coins.map((coin) => {
            return (
              <TrendingCoin key={coin.item.id}>
                <TopWrapper>
                  <img src={coin.item.thumb} alt="coin" />
                  <div>
                    <div>{coin.item.name}</div>
                    <div></div>
                    <div></div>
                  </div>
                </TopWrapper>
              </TrendingCoin>
            );
          })}
      </CoinList>
    </Wrapper>
  );
};

export default TrendingCoins;
