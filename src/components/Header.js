import React from "react";
import styled from "styled-components";

import Topbar from "./Topbar";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: column;
`;

const StyledWrapper = styled.div`
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
`;

const Header = () => {
    return (
        <React.Fragment>
            <StyledHeader>
                <StyledWrapper>
                    <Topbar />
                </StyledWrapper>
            </StyledHeader>
        </React.Fragment>
    );
};

export default Header;
