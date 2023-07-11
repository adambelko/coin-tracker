import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Wrapper = styled.div`
  display: flex;
`;

const LineChart = () => {
  const [chartData, setChartData] = useState();
  const coinTimeStamp = [];
  const coinPrice = [];

  const chartDataAPI =
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily&precision=full";

  useEffect(() => {
    axios
      .get(chartDataAPI)
      .then((response) => setChartData(response.data))
      .catch((error) => console.log(error));
  }, []);

  chartData?.prices?.forEach((data) => {
    coinTimeStamp.push(new Date(data[0]).toLocaleDateString());
    coinPrice.push(data[1].toFixed(1));
  });

  console.log(chartData);

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <Wrapper>
      <Line data={data} />
    </Wrapper>
  );
};

export default LineChart;
