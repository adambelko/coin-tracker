import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "../pages/Home";

const Main = () => {
    const StyledMain = styled.main`
        display: flex;
        flex-direction: column;
        width: 85%;
        margin: auto;
    `;

    return (
        <StyledMain>
            <Routes>
                <Route to="/">
                    <Route index element={<Home />} />
                </Route>
                <Route to="/cryptocurrencies">
                    {/* <Route element={} /> */}
                </Route>
                <Route to="/news">{/* <Route index element={} /> */}</Route>
                <Route to="/portfolio">
                    {/* <Route index element={} /> */}
                </Route>
            </Routes>
        </StyledMain>
    );
};

export default Main;
