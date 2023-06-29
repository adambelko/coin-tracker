import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ScrollToTop from "react-scroll-to-top";

import Home from "../pages/Home";
import CoinDetails from "./CoinDetails";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;

const Main = ({ globalData, formatCoinPrice }) => {
  return (
    <StyledMain>
      <ScrollToTop smooth />
      <Routes>
        <Route to="/">
          <Route
            index
            element={
              <Home globalData={globalData} formatCoinPrice={formatCoinPrice} />
            }
          />
        </Route>
        <Route to="/news">{/* <Route index element={} /> */}</Route>
        <Route to="/portfolio">{/* <Route index element={} /> */}</Route>
        <Route
          path="/currencies/:id"
          element={<CoinDetails formatCoinPrice={formatCoinPrice} />}
        ></Route>
      </Routes>
    </StyledMain>
  );
};

export default Main;
