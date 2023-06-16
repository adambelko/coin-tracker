import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [globalData, setGlobalData] = useState([]);

  const globalAPI = "https://api.coingecko.com/api/v3/global";

  useEffect(() => {
    axios
      .get(globalAPI)
      .then((response) => setGlobalData(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <Header globalData={globalData} />
      <Main globalData={globalData} />
    </React.Fragment>
  );
}

export default App;
