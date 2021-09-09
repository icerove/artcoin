// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Accordion,
  Card,
  Spinner,
} from "react-bootstrap";
import AlertBanner from "./utils/Alerts";
import tokenIcon from "./utils/tokenIcon";
import { formatNearWithDecimal } from "./utils/format";

import {
  initialState_zero_price,
  initialState_zero_balance,
} from "./State/state";

import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
import { API_URL } from "./State/state";

const GAS = 300000000000000;

const TradeCard = ({ contract, accountId, ausdContract }) => {
  const [assetP, setAssetP] = useState(initialState_zero_price);
  const [assetB, setAssetB] = useState(initialState_zero_balance);
  const [currentAsset, setCurrentAsset] = useState("aBTC");
  const [ausdBalance, setAusdBalance] = useState("l");

  // Button text, '' means show text, 'l' means show spinner
  const [buyLoading, setBuyLoading] = useState("");
  const [sellLoading, setSellLoading] = useState("");

  const maybeLoad = (state, displayFun) => {
    if (state === "l") {
      return <Spinner size="sm" animation="border" />;
    } else {
      return displayFun(state);
    }
  };

  const loadAUSDBalance = () => {
    ausdContract
      .get_balance({ owner_id: accountId })
      .then((ausd) => setAusdBalance(ausd));
  };

  const loadCurrentAssetPrice = () => {
    loadAssetPrice(currentAsset);
  };

  const loadCurrentAssetBalance = () => {
    loadAssetBalance(currentAsset);
  };

  const loadAssetPrice = (a) => {
    contract.get_asset_price({ asset: a }).then((price) => {
      setAssetP({ ...assetP, [a]: price });
    });
  };

  const loadAssetBalance = (a) => {
    contract
      .get_asset_balance({ account_id: accountId, asset: a })
      .then((balance) => setAssetB({ ...assetB, [a]: balance }));
  };

  // plot chart
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(null);

  const loadPriceChart = (asset) => {
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
        setPrice(price);
        setDate(date);
      });
  };

  // chart option
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

  useEffect(() => {
    loadAUSDBalance();
    loadCurrentAssetPrice();
    loadCurrentAssetBalance();
    loadPriceChart(currentAsset);
    setInterval(() => {
      loadAUSDBalance();
      loadCurrentAssetPrice();
    }, 300000);
  }, []);

  const assetItems = Object.entries(assetB).map(([k, _]) => (
    <option key={k}>{k}</option>
  ));

  // alert
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("");

  // buy and sell with aUSD
  const [buyAmount, setBuyAmount] = useState({ asset: "0", aUSD: "0" });

  const [sellAmount, setSellAmount] = useState({ asset: "0", aUSD: "0" });

  const buyAssetWithAusd = async (event) => {
    event.preventDefault();
    let amount = (Number(buyAmount.asset) * 10 ** 24).toLocaleString(
      "fullwide",
      { useGrouping: false }
    );
    setBuyLoading("l");
    try {
      await contract.buy_asset_with_ausd(
        { asset: currentAsset, asset_amount: amount },
        GAS
      );
      await loadCurrentAssetBalance();
    } catch (e) {
      setAlert(true);
      setError(e.message);
    }
    setBuyLoading("");
  };

  const sellAssettoAusd = async (event) => {
    event.preventDefault();
    let amount = (Number(sellAmount.asset) * 10 ** 24).toLocaleString(
      "fullwide",
      { useGrouping: false }
    );
    setSellLoading("l");
    try {
      await contract.sell_asset_to_ausd(
        { asset: currentAsset, asset_amount: amount },
        GAS
      );
      await loadCurrentAssetBalance();
    } catch (e) {
      setAlert(true);
      setError(e.message);
    }
    setSellLoading("");
  };

  return (
    <div className="trade-card">
      {alert && (
        <AlertBanner error={error} setError={setError} setAlert={setAlert} />
      )}
      <Row noGutters>
        <Col md="4" xs="12">
          <Row noGutters className="p-2" style={{ background: "#fff" }}>
            <Col className="p-2 title-font">BUY/SELL</Col>
            <Col>
              <Form.Group controlId="formSelect">
                <Form.Control
                  value={currentAsset}
                  as="select"
                  onChange={(event) => {
                    if (event) {
                      const value =
                        event.target !== null ? event.target.value : "";
                      setCurrentAsset(value);
                      loadAssetPrice(value);
                      loadPriceChart(value);
                    }
                  }}
                >
                  {assetItems}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row noGutters className="p-2" style={{ background: "#fff" }}>
            aUSD Balance:{" "}
            {maybeLoad(ausdBalance, (a) => formatNearWithDecimal(a))} $
          </Row>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header className="title-font">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  BUY
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form onSubmit={buyAssetWithAusd} style={{ width: "100%" }}>
                    <Form.Group controlId="buyAsset">
                      <Form.Label>
                        BUY{" "}
                        <img
                          src={tokenIcon[currentAsset]}
                          alt="icon"
                          className="icon"
                        />
                        {currentAsset}:{" "}
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                          <InputGroup.Text>{currentAsset}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          value={buyAmount.asset}
                          onChange={(event) => {
                            if (event) {
                              const value =
                                event.target !== null ? event.target.value : "";
                              setBuyAmount({
                                asset: value,
                                aUSD:
                                  (Number(value) *
                                    Number(assetP[currentAsset])) /
                                  10 ** 8,
                              });
                            }
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="fromausd">
                      <Form.Label>
                        with{" "}
                        <img src={tokenIcon.aUSD} alt="icon" className="icon" />
                        aUSD:{" "}
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                          <InputGroup.Text>aUSD</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          value={buyAmount.aUSD}
                          onChange={(event) => {
                            if (event) {
                              const value =
                                event.target !== null ? event.target.value : "";
                              setBuyAmount({
                                asset:
                                  Number(value) /
                                  (Number(assetP[currentAsset]) / 10 ** 8),
                                aUSD: value,
                              });
                            }
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Row style={{ fontSize: "12px" }}>
                      <Col>
                        Balance: {formatNearWithDecimal(assetB[currentAsset])}
                      </Col>
                      <Col>
                        Price: 1 {currentAsset} ={" "}
                        {(Number(assetP[currentAsset]) / 10 ** 8).toFixed(4)}{" "}
                        aUSD
                      </Col>
                      <Col>
                        USD VALUE: $
                        {(
                          (Number(buyAmount.asset) *
                            Number(assetP[currentAsset])) /
                          10 ** 8
                        ).toFixed(4)}
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                      {maybeLoad(buyLoading, (a) => "CONFIRM TRADE")}
                    </Button>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className="title-font">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  SELL
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Form onSubmit={sellAssettoAusd} style={{ width: "100%" }}>
                    <Form.Group controlId="sellAsset">
                      <Form.Label>
                        SELL{" "}
                        <img
                          src={tokenIcon[currentAsset]}
                          alt="icon"
                          className="icon"
                        />
                        {currentAsset}:{" "}
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                          <InputGroup.Text>{currentAsset}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          value={sellAmount.asset}
                          onChange={(event) => {
                            if (event) {
                              const value =
                                event.target !== null ? event.target.value : "";
                              setSellAmount({
                                asset: value,
                                aUSD:
                                  (Number(value) *
                                    Number(assetP[currentAsset])) /
                                  10 ** 8,
                              });
                            }
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="toausd">
                      <Form.Label>
                        to{" "}
                        <img src={tokenIcon.aUSD} alt="icon" className="icon" />
                        aUSD:{" "}
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                          <InputGroup.Text>aUSD</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          value={sellAmount.aUSD}
                          onChange={(event) => {
                            if (event) {
                              const value =
                                event.target !== null ? event.target.value : "";
                              setSellAmount({
                                asset:
                                  Number(value) /
                                  (Number(assetP[currentAsset]) / 10 ** 8),
                                aUSD: value,
                              });
                            }
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    <Row style={{ fontSize: "12px" }}>
                      <Col>
                        Balace: {formatNearWithDecimal(assetB[currentAsset])}
                      </Col>
                      <Col>
                        Price: 1 {currentAsset} ={" "}
                        {(Number(assetP[currentAsset]) / 10 ** 8).toFixed(4)}{" "}
                        aUSD
                      </Col>
                      <Col>
                        USD VALUE: $
                        {(
                          (Number(sellAmount.asset) *
                            Number(assetP[currentAsset])) /
                          10 ** 8
                        ).toFixed(4)}
                      </Col>
                    </Row>

                    <Button variant="primary" type="submit">
                      {maybeLoad(sellLoading, (a) => "CONFIRM TRADE")}
                    </Button>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>
        <Col md="8" xs="12">
          <ReactEcharts
            option={getOption(currentAsset + " / aUSD", price, date)}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TradeCard;
