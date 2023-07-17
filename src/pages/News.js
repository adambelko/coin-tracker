import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 87%;
  max-width: 1400px;
  margin: 0 auto;
`;

const NewsUnit = styled.div`
  display: flex;
  margin-bottom: 3em;

  img {
    height: 70px;
    margin-right: 1em;
  }
`;

const NewsHeader = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  margin: 1.3em 0;
`;

const NewsUnitTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsUnitHeadline = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 0.4em;
`;

const NewsUnitSummary = styled.div`
  display: flex;
  color: #58667e;
  margin-top: 0.5em;
`;

const News = () => {
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    axios
      .get(
        "https://finnhub.io/api/v1/news?category=crypto&token=ciq7r69r01qihcgufcg0ciq7r69r01qihcgufcgg"
      )
      .then((response) => setNewsData(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(newsData);
  return (
    <Wrapper>
      <NewsHeader>Latest Cryptocurrency News</NewsHeader>
      {newsData &&
        newsData.map((news) => {
          return (
            <NewsUnit>
              <img src={news.image} alt="news_img" />
              <NewsUnitTextWrapper>
                <NewsUnitHeadline>{news.headline}</NewsUnitHeadline>
                <NewsUnitSummary>{news.summary}</NewsUnitSummary>
              </NewsUnitTextWrapper>
            </NewsUnit>
          );
        })}
    </Wrapper>
  );
};

export default News;
