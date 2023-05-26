import styled from "styled-components";

import Topbar from "./Topbar";
import Navigation from "./Navbar/Navigation";
import MobileNavigation from "./Navbar/MobileNavigation";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;

    @media (max-width: 900px) {
        flex-direction: column-reverse;
    }
`;

const Wrapper = styled.div`
    border-top: 1px solid #eff2f5;
    padding: 1.2em 0;
`;

const Header = () => {
    return (
        <StyledHeader>
            <Wrapper>
                <Topbar />
            </Wrapper>
            <Wrapper>
                <Navigation />
                <MobileNavigation />
            </Wrapper>
        </StyledHeader>
    );
};

export default Header;
