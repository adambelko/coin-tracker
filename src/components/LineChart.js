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
    padding: 4px;
    cursor: pointer;

    li {
      padding: 0.4em 0.6em;
      white-space: nowrap;
      border-radius: 6px;
      &:hover {
        background-color: #f8fafd;
      }
      &.active {
        background-color: #ffffff;
      }
    }
  }
`;

const LineChart = ({ coin }) => {
  const [chartData, setChartData] = useState();
  const [timeInterval, setTimeInterval] = useState(30);
  const [activeInterval, setActiveInterval] = useState(30);
  const coinTimeStamp = [];
  const coinPrice = [];

  const chartDataAPI = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${timeInterval}&interval=daily&precision=full`;

  useEffect(() => {
    axios
      .get(chartDataAPI)
      .then((response) => setChartData(response.data))
      .catch((error) => console.log(error));
  }, [timeInterval]);

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#4789f7",
        borderColor: "#4789f7",
      },
    ],
  };

  chartData?.prices?.forEach((data) => {
    coinTimeStamp.push(new Date(data[0]).toLocaleDateString());
    coinPrice.push(data[1].toFixed(1));
  });

  const handleTimeIntervalClick = (interval) => {
    setTimeInterval(interval);
    setActiveInterval(interval);
  };

  return (
    <Wrapper>
      <ChartManager>
        <ChartContentBar></ChartContentBar>
        <TimeIntervalBar>
          <ul>
            <li
              onClick={() => handleTimeIntervalClick(1)}
              className={activeInterval === 1 ? "active" : ""}
            >
              1D
            </li>
            <li
              onClick={() => handleTimeIntervalClick(7)}
              className={activeInterval === 7 ? "active" : ""}
            >
              7D
            </li>
            <li
              onClick={() => handleTimeIntervalClick(30)}
              className={activeInterval === 30 ? "active" : ""}
            >
              1M
            </li>
            <li
              onClick={() => handleTimeIntervalClick(365)}
              className={activeInterval === 365 ? "active" : ""}
            >
              1Y
            </li>
            <li
              onClick={() => handleTimeIntervalClick("max")}
              className={activeInterval === "max" ? "active" : ""}
            >
              ALL
            </li>
          </ul>
        </TimeIntervalBar>
      </ChartManager>
      <Line data={data} />
    </Wrapper>
  );
};

export default LineChart;
