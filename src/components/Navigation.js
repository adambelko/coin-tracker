import styled from "styled-components";

const StyledNavigation = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    margin: auto;
    color: #212532;
`;

const StyledList = styled.ul`
    display: flex;
    gap: 2em;
    align-items: center;
    font-weight: 600;
`;

const StyledName = styled.h1`
    font-size: 1.5rem;
`;

const StyledListItem = styled.li`
    display: flex;
    &:hover {
        color: #4789f7;
    }
`;

const StyledWrapper = styled.div``;

const StyledSearchInput = styled.input`
    background-color: #eff2f5;
    width: 230px;
    padding: 1em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

const Navigation = () => {
    return (
        <StyledNavigation>
            <StyledList>
                <StyledName>Crypto Tracker</StyledName>
                <StyledListItem>Cryptocurrencies</StyledListItem>
                <StyledListItem>News</StyledListItem>
                <StyledListItem>Portfolio</StyledListItem>
            </StyledList>
            <StyledWrapper>
                <StyledSearchInput placeholder="Search..."></StyledSearchInput>
            </StyledWrapper>
        </StyledNavigation>
    );
};

export default Navigation;
