import styled from "styled-components";

const InformationPanel = styled.section`
    display: flex;
    flex-direction: column;
`;

const InformationTitle = styled.h2`
    font-size: 1.6rem;
`;

const InformationValue = styled.div`
    display: flex;
`;

const Home = () => {
    return (
        <InformationPanel>
            <InformationTitle>
                Today's Cryptocurrency Prices by Market Cap
            </InformationTitle>
            <InformationValue>
                The global crypto market cap is $1.12T, a 1.01% increase over
                the last day.
            </InformationValue>
        </InformationPanel>
    );
};

export default Home;
