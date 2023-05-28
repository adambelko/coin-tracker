import styled from "styled-components";

const TopbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  width: 87%;
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
  color: ${(props) => props.theme.colors.grey};
  cursor: ${(props) => (props.pointer ? "pointer" : "auto")};
`;

const StyledValue = styled.div`
  color: ${(props) => props.theme.colors.blue};
  cursor: pointer;
`;

const Topbar = () => {
  return (
    <TopbarWrapper>
      <LeftWrapper>
        <StyledElement>
          Coins:<StyledValue>&nbsp;1010</StyledValue>
        </StyledElement>
        <StyledElement>
          Market Cap:
          <StyledValue>&nbsp;1,172,452,119,542</StyledValue>
        </StyledElement>
        <StyledElement>
          24h Volume:
          <StyledValue>&nbsp;$29,000,273,108</StyledValue>
        </StyledElement>
        <StyledElement>
          Dominance:
          <StyledValue>&nbsp;BTC: 46.3% ETH: 19.5%</StyledValue>
        </StyledElement>
        <StyledElement>
          ETH Gas:<StyledValue>&nbsp;35 Gwei</StyledValue>
        </StyledElement>
      </LeftWrapper>
      <RightWrapper>
        <StyledElement pointer={"pointer"}>USD</StyledElement>
        <StyledElement pointer={"pointer"}>Mode</StyledElement>
      </RightWrapper>
    </TopbarWrapper>
  );
};

export default Topbar;
