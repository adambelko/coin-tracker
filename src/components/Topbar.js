import styled from "styled-components";

const StyledTopbar = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 0.8rem;
    width: 85%;
    margin: auto;
    padding: 1.5em 0;
`;

const StyledLeftWrapper = styled.div`
    display: flex;
    gap: 1.5em;
`;

const StyledRightWrapper = styled.div`
    display: flex;
    gap: 1.5em;
`;

const StyledElement = styled.div`
    display: flex;
    color: #6b7280;
`;

const StyledValue = styled.div`
    color: #4789f7;
`;

const Topbar = () => {
    return (
        <StyledTopbar>
            <StyledLeftWrapper>
                <StyledLeftWrapper></StyledLeftWrapper>
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
            </StyledLeftWrapper>
            <StyledRightWrapper>
                <StyledElement>USD</StyledElement>
                <StyledElement>Mode</StyledElement>
            </StyledRightWrapper>
        </StyledTopbar>
    );
};

export default Topbar;
