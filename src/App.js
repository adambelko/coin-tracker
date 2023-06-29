import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

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
    <React.Fragment>
      <Header globalData={globalData} />
      <Main globalData={globalData} formatCoinPrice={formatCoinPrice} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
