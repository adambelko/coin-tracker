import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

function App() {
  const [globalData, setGlobalData] = useState([]);

  const globalAPI = "https://api.coingecko.com/api/v3/global";

  const formatCoinPrice = (price) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    axios
      .get(globalAPI)
      .then((response) => setGlobalData(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <StyledRoot>
      <Header globalData={globalData} />
      <Main globalData={globalData} formatCoinPrice={formatCoinPrice} />
      <Footer />
    </StyledRoot>
  );
}

export default App;
