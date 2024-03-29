import styled from "styled-components";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const TopbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  width: 87%;
  max-width: 1400px;
  margin: auto;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5em;
  white-space: nowrap;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  gap: 1.5em;
  margin-left: 1em;
  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledElement = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.grey};
  cursor: ${(props) => (props.pointer ? "pointer" : "auto")};
`;

const StyledValue = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.blue};
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledChange = styled.span`
  color: ${(props) => (props.red ? "red" : props.theme.colors.green)};
`;

const Topbar = ({ data }) => {
  const colorize = (data) => {
    data = data.toFixed(1);
    if (data < 0)
      return (
        <Wrapper>
          <MdArrowDropDown size="17px" color="red" />
          <StyledChange red="true">{Math.abs(data)}%</StyledChange>
        </Wrapper>
      );
    if (data > 0)
      return (
        <Wrapper>
          <MdArrowDropUp size="17px" />
          <StyledChange>{data}%</StyledChange>
        </Wrapper>
      );
    return <StyledValue>{data}%</StyledValue>;
  };

  return (
    <TopbarWrapper>
      <LeftWrapper>
        <StyledElement>
          Coins:&nbsp;
          <StyledValue>{data && data.active_cryptocurrencies}</StyledValue>
        </StyledElement>
        <StyledElement>
          Markets:&nbsp;
          <StyledValue>{data && data.markets}</StyledValue>
        </StyledElement>
        <StyledElement>
          Market Cap:&nbsp;
          <StyledValue>
            {data &&
              data.total_market_cap &&
              data.total_market_cap.usd &&
              data.total_market_cap.usd.toLocaleString().slice(0, -4)}
            &nbsp;
            <StyledChange>
              {data.market_cap_change_percentage_24h_usd &&
                colorize(data.market_cap_change_percentage_24h_usd)}
            </StyledChange>
          </StyledValue>
        </StyledElement>
        <StyledElement>
          Dominance:&nbsp;
          <StyledValue>
            BTC: $
            {data &&
              data.market_cap_percentage &&
              data.market_cap_percentage.btc &&
              data.market_cap_percentage.btc.toFixed(1)}
            % &nbsp; ETH: $
            {data &&
              data.total_market_cap &&
              data.market_cap_percentage.eth &&
              data.market_cap_percentage.eth.toFixed(1)}
            %
          </StyledValue>
        </StyledElement>
        <StyledElement>
          ETH Gas:<StyledValue>&nbsp;35 Gwei</StyledValue>
        </StyledElement>
      </LeftWrapper>
      <RightWrapper></RightWrapper>
    </TopbarWrapper>
  );
};

export default Topbar;
