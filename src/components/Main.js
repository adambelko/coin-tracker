import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import ScrollToTop from "react-scroll-to-top";

import Home from "../pages/Home";
import News from "../pages/News";
import CoinDetails from "./CoinDetails";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Main = ({ globalData, formatCoinPrice }) => {
  return (
    <StyledMain>
      <ScrollToTop smooth />
      <Routes>
        <Route
          path="/"
          element={
            <Home globalData={globalData} formatCoinPrice={formatCoinPrice} />
          }
        />
        <Route path="/news" element={<News />} />
        <Route
          path="/currencies/:id"
          element={<CoinDetails formatCoinPrice={formatCoinPrice} />}
        ></Route>
      </Routes>
    </StyledMain>
  );
};

export default Main;
