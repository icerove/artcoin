import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { API_URL, brief_coinList, initialState_null_dash } from "./State/state";

const Dash = () => {
  const [day, setDay] = useState(initialState_null_dash);
  const [ready, setReady] = useState(false);

  const getPriceList = async () => {
    let dailyPriceList = initialState_null_dash;

    for (const p in dailyPriceList) {
      let res3 = await fetch(`${API_URL}/${p}/1D`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      res3 = await res3.json();
      dailyPriceList[p] = res3;
    }

    setDay(dailyPriceList);
  };

  useEffect(() => {
    async function fetchData() {
      await getPriceList();
      setReady(true);
    }
    fetchData();
  }, []);

  const getPrice = (array) => {
    return array.map((arr) => arr.price.toFixed(2));
  };

  const getDate = (array) => {
    return array.map((arr) => moment(arr.time).format("YYYY/MM/DD HH:mm:ss"));
  };

  const getOption = (title, data, date) => {
    return {
      title: {
        text: title,
        textStyle: {
          fontWeight: "lighter",
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: date,
          axisLabel: {
            formatter: function (value) {
              return moment(value).format("HH:mm:ss");
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "white",
            },
          },
          axisLabel: {
            formatter: function (value) {
              return value > 1000
                ? (value / 1000).toFixed(2) + "k"
                : value.toFixed(2);
            },
          },
          min: function (value) {
            return value.min - value.min * 0.02;
          },
        },
      ],
      series: [
        {
          name: "Price: ",
          type: "line",
          lineStyle: {
            color: "#9c87f7",
            width: 1,
          },
          symbol: "none",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(207, 196, 255)",
              },
              {
                offset: 1,
                color: "rgba(236, 232, 255, 0.1)",
              },
            ]),
          },
          data: data,
        },
      ],
    };
  };

  const Charts = ({ index }) => {
    if (ready) {
      return (
        <ReactEcharts
          option={getOption(
            index + " / aUSD",
            getPrice(day[index]),
            getDate(day[index])
          )}
          style={{ width: "100%", height: "200px" }}
        />
      );
    }
    return <Spinner animation="border" />;
  };

  return (
    <div>
      <h3>Start trading today</h3>
      <div className="dash-charts">
        {brief_coinList.map((coin) => (
          <div className="box" key={coin}>
            <Charts index={coin} />
          </div>
        ))}
      </div>
      <div style={{ margin: "1%" }}>
        <Link to="/markets">-- View All Assets Stats --</Link>
      </div>
    </div>
  );
};

export default Dash;
