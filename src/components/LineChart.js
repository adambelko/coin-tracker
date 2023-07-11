import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 930px;
  flex-grow: 1;
`;

const ChartManager = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 0.9em;
`;

const ChartContentBar = styled.div`
  width: 200px;
  background: ${(props) => props.theme.colors.greySecondary};
`;
const TimeIntervalBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  overflow: auto visible;
  background: ${(props) => props.theme.colors.greySecondary};
  border-radius: 6px;

  ul {
    display: flex;
    list-style: none;
    padding: 3px;

    li {
      padding: 0.4em 0.6em;
      white-space: nowrap;
    }
  }
`;

const LineChart = ({ coin }) => {
  const [chartData, setChartData] = useState();
  const coinTimeStamp = [];
  const coinPrice = [];

  const chartDataAPI = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=30&interval=daily&precision=full`;

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
      <ChartManager>
        <ChartContentBar></ChartContentBar>
        <TimeIntervalBar>
          <ul>
            <li>1D</li>
            <li>7D</li>
            <li>1M</li>
            <li>1Y</li>
            <li>ALL</li>
          </ul>
        </TimeIntervalBar>
      </ChartManager>
      <Line data={data} />
    </Wrapper>
  );
};

export default LineChart;
