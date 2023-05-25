import styled from "styled-components";

const StyledTopbar = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    width: 85%;
    margin: auto;
`;

const StyledWrapper = styled.div`
    display: flex;
    gap: 1.5em;
`;

const StyledElement = styled.div`
    display: flex;
    color: #6b7280;
    cursor: ${(props) => (props.pointer ? "pointer" : "auto")};
`;

const StyledValue = styled.div`
    color: #4789f7;
    cursor: pointer;
`;

const Topbar = () => {
    return (
        <StyledTopbar>
            <StyledWrapper>
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
            </StyledWrapper>
            <StyledWrapper>
                <StyledElement pointer>USD</StyledElement>
                <StyledElement pointer>Mode</StyledElement>
            </StyledWrapper>
        </StyledTopbar>
    );
};

export default Topbar;
