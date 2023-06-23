import React from "react";
import styled from "styled-components";

import newsImg from "../images/newsletter_bg_light.svg";

const CryptoNewsWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

const CryptoNews = styled.div`
  display: flex;
  width: 87%;
  max-width: 1400px;
  margin: auto;
  margin-top: 2em;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
  @media (max-width: 675px) {
    width: 93%;
  }
`;

const NewsTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  padding-left: 1em;

  @media (max-width: 1200px) {
    padding-left: 0;
  }
  @media (max-width: 675px) {
    padding-left: 0;
    height: fit-content;
  }
`;

const NewsMainText = styled.div`
  font-size: 2.5rem;
  font-weight: 400;
  padding-top: 2.5em;
  span {
    font-weight: bold;
  }

  @media (max-width: 1200px) {
    padding-top: 1em;
  }
  @media (max-width: 675px) {
    font-size: 1.8rem;
  }
`;

const NewsParagraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.4;
  padding-top: 1.5em;
  color: ${(props) => props.theme.colors.darkBlue};
`;

const NewsSubscribeButton = styled.button`
  width: fit-content;
  margin-top: 2.5em;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  padding: 1em 1.6em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.darkBlueBtn};
  &:hover {
    background-color: ${(props) => props.theme.hover.darkBlueBtn};
  }

  @media (max-width: 675px) {
    width: 100%;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
`;

const NewsImgWrapper = styled.img`
  max-width: 100%;
  padding-top: 1.5em;
  object-fit: cover;
`;

const Newsletter = () => {
  const newsLetter = (
    <CryptoNewsWrapper>
      <CryptoNews>
        <NewsTextWrapper>
          <NewsMainText>
            Be the first to know about <span>crypto news every day</span>
          </NewsMainText>
          <NewsParagraph>
            Get crypto analysis, news and updates right to your inbox! Sign up
            here so you don't miss a single newsletter.
          </NewsParagraph>
          <NewsSubscribeButton>Subscribe Now</NewsSubscribeButton>
        </NewsTextWrapper>
        <NewsImgWrapper src={newsImg} />
      </CryptoNews>
    </CryptoNewsWrapper>
  );

  return <React.Fragment>{newsLetter}</React.Fragment>;
};

export default Newsletter;
