import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";
import Navigation from "./Navigation";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
`;

const StyledWrapper = styled.div`
    border-top: 1px solid #eff2f5;
    padding: 1.2em 0;
`;

const Header = () => {
    return (
        <React.Fragment>
            <StyledHeader>
                <StyledWrapper>
                    <Topbar />
                </StyledWrapper>
                <StyledWrapper>
                    <Navigation />
                </StyledWrapper>
            </StyledHeader>
        </React.Fragment>
    );
};

export default Header;
