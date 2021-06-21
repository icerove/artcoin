import React, { useEffect, useState } from "react";
import { Tabs, Tab, Row, Col, Spinner } from "react-bootstrap";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
import { API_URL, coinList } from "./State/state";
import tokenIcon from "./tokenIcon";

const Markets = () => {
  const [monthPrice, setMonthPrice] = useState(null);
  const [weekPrice, setWeekPrice] = useState(null);
  const [dayPrice, setDayPrice] = useState(null);

  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [day, setDay] = useState(null);

  const [currentAsset, setCurrentAsset] = useState("art");

  const [ready, setReady] = useState(false);

  const getPriceList = async (asset) => {
    fetch(`${API_URL}/${asset}/1D`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) => {
        let price = res.map((arr) => arr.price.toFixed(2));
        let date = res.map((arr) =>
          moment(arr.time).format("YYYY/MM/DD HH:MM:SS")
        );
        setDayPrice(price);
        setDay(date);
      });
    fetch(`${API_URL}/${asset}/1W`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) => {
        let price = res.map((arr) => arr.price.toFixed(2));
        let date = res.map((arr) =>
          moment(arr.time).format("YYYY/MM/DD HH:MM:SS")
        );
        setWeekPrice(price);
        setWeek(date);
      });
    fetch(`${API_URL}/${asset}/1M`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((result) => result.json())
      .then((res) => {
        let price = res.map((arr) => arr.price.toFixed(2));
        let date = res.map((arr) =>
          moment(arr.time).format("YYYY/MM/DD HH:MM:SS")
        );
        setMonthPrice(price);
        setMonth(date);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await getPriceList(currentAsset);
      setReady(true);
    }
    fetchData();
  }, []);

  const getOption = (title, data, date) => {
    return {
      title: {
        text: title,
        textStyle: {
          fontWeight: "bolder",
          fontSize: 20,
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

  const Charts = ({ asset }) => {
    if (ready) {
      return (
        <Tabs defaultActiveKey="daily" id="price">
          <Tab eventKey="daily" title="Day">
            <ReactEcharts
              option={getOption(asset + " / aUSD", dayPrice, day)}
              style={{ width: "100%", height: "560px" }}
            />
          </Tab>
          <Tab eventKey="week" title="Week">
            <ReactEcharts
              option={getOption(asset + " / aUSD", weekPrice, week)}
              style={{ width: "100%", height: "560px" }}
            />
          </Tab>
          <Tab eventKey="month" title="Month">
            <ReactEcharts
              option={getOption(asset + " / aUSD", monthPrice, month)}
              style={{ width: "100%", height: "560px" }}
            />
          </Tab>
        </Tabs>
      );
    }
    return (
      <Row className="m-2 p-2" noGutters>
        <Spinner
          animation="border"
          style={{ fontSize: "2rem", width: "2rem", height: "2rem" }}
        />
        <Spinner
          animation="border"
          style={{ fontSize: "2rem", width: "2rem", height: "2rem" }}
        />
        <Spinner
          animation="border"
          style={{ fontSize: "2rem", width: "2rem", height: "2rem" }}
        />
      </Row>
    );
  };

  return (
    <div>
      <Row noGutters>
        <Col className="watch-list p-1" xs="12" md="4">
          <h3 style={{ position: "sticky", top: "0" }}>Watchlist</h3>
          <ul>
            {coinList.map((k, i) => (
              <li
                key={k}
                className={
                  currentAsset === k ? "watch-item item-seleted" : "watch-item"
                }
                onClick={() => {
                  setCurrentAsset(k);
                  getPriceList(k);
                }}
              >
                <img src={tokenIcon[k]} alt="icon" className="icon" />
                {k}
              </li>
            ))}
          </ul>
        </Col>
        <Col xs="12" md="8" className="p-3">
          <Charts asset={currentAsset} />
        </Col>
      </Row>
    </div>
  );
};

export default Markets;
