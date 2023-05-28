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

const TopWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.greySecondary};
  padding: 1em 0;
`;

const BottomWrapper = styled(TopWrapper)`
  border-bottom: 1px solid ${(props) => props.theme.colors.greySecondary};
`;

const Header = () => {
  return (
    <StyledHeader>
      <TopWrapper>
        <Topbar />
      </TopWrapper>
      <BottomWrapper>
        <Navigation />
        <MobileNavigation />
      </BottomWrapper>
    </StyledHeader>
  );
};

export default Header;
