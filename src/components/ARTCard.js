import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FormControl,
  Modal,
  Spinner,
  Card,
} from "react-bootstrap";
import BN from "bn.js";
import AlertBanner from "./utils/Alerts";
import tokenIcon from "./utils/tokenIcon";
import { formatNearWithDecimal } from "./utils/format";

import { FcRefresh } from "react-icons/fc";
import Guide from "./utils/Guide";

const GAS = 300000000000000;
const UNIT = new BN("1000000000000000000000000");

const ARTCard = ({ currentUser, contract, ausdContract }) => {
  const [artTotalBalance, setArtTotalBalance] = useState("l");
  const [artStakedBalance, setArtStakedBalance] = useState("l");
  const [artUnstakedBalance, setArtUnstakedBalance] = useState("l");

  const [ausdBalance, setAusdBalance] = useState("l");
  const [artPrice, setArtPrice] = useState("l");
  const nearBalance = formatNearWithDecimal(currentUser.balance);
  const [nearPrice, setNearPrice] = useState("l");
  console.log(ausdBalance);
  // Button text, '' means show text, 'l' means show spinner
  const [transferSubmit, setTransferSubmit] = useState("");
  const [stakeAndMintLoading, setStakeAndMintLoading] = useState("");
  const [unstakAndBurnLoading, setUnstakeAndBurnLoading] = useState("");
  const [exchangeAUSDLoading, setExchangeAUSDLoading] = useState("");
  const [exchangeARTLoading, setExchangeARTLoading] = useState("");

  const loadTotalBalance = () => {
    return contract
      .get_total_balance({ owner_id: currentUser.accountId })
      .then((art) => setArtTotalBalance(art));
  };

  const loadUnstakedBalance = () => {
    return contract
      .get_unstaked_balance({ owner_id: currentUser.accountId })
      .then((art) => setArtUnstakedBalance(art));
  };

  const loadStakedBalance = () => {
    return contract
      .get_staked_balance({ account_id: currentUser.accountId })
      .then((art) => setArtStakedBalance(art));
  };

  const loadPrice = () => {
    contract.get_price().then((price) => setArtPrice(price));
  };

  const loadAUSDBalance = () => {
    ausdContract
      .get_balance({ owner_id: currentUser.accountId })
      .then((ausd) => setAusdBalance(ausd));
  };

  const loadNearPrice = () => {
    contract.get_asset_price({ asset: "aNEAR" }).then((price) => {
      setNearPrice(price);
    });
  };

  useEffect(() => {
    loadTotalBalance();
    loadUnstakedBalance();
    loadStakedBalance();
    loadPrice();
    loadAUSDBalance();
    loadNearPrice();

    setInterval(() => {
      loadPrice();
      loadAUSDBalance();
      loadNearPrice();
    }, 300000);
  });

  // refresh staking reward
  const refreshStakingReward = () => {
    return contract.refresh_reward({}, GAS).then((res) => {
      if (res === true) {
        loadStakedBalance();
      }
      return;
    });
  };

  // deposit
  const [deposit, setDeposit] = useState("10");
  const [deposit_ausd, setDepositAUSD] = useState("10");

  const buyArtWithNear = (event) => {
    event.preventDefault();
    let nearDeposit = (
      (Number(deposit) * 10 ** 24 * Number(artPrice)) /
      Number(nearPrice)
    ).toLocaleString("fullwide", { useGrouping: false });
    contract.buy_art_with_near({}, GAS, nearDeposit.toString());
  };

  const buyAusdWithNear = (event) => {
    event.preventDefault();
    localStorage.setItem("ausd", "true");
    let nearDeposit = (
      (Number(deposit) * 10 ** 24 * 100000000) /
      Number(nearPrice)
    ).toLocaleString("fullwide", { useGrouping: false });
    contract.buy_ausd_with_near({}, GAS, nearDeposit.toString());
  };

  // alert
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState("");

  // transfer
  const [receiver, setReceiver] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const transferArt = async (event) => {
    event.preventDefault();
    setArtTotalBalance("l");
    setArtUnstakedBalance("l");
    setTransferSubmit("l");
    try {
      await contract.transfer(
        {
          new_owner_id: receiver,
          amount: (Number(transferAmount) * 10 ** 24).toLocaleString(
            "fullwide",
            {
              useGrouping: false,
            }
          ),
        },
        GAS
      );
    } catch (e) {
      setAlert(true);
      setError(JSON.stringify(e));
    }
    setTransferSubmit("");
    setShow(false);
    loadTotalBalance();
    loadUnstakedBalance();
  };

  // stake
  const [stakeAmount, setStake] = useState("100");

  const stakeAndmint = async (event) => {
    event.preventDefault();
    setArtUnstakedBalance("l");
    setArtStakedBalance("l");
    setAusdBalance("l");
    setStakeAndMintLoading("l");

    try {
      await contract.stake_and_mint({
        stake: (Number(stakeAmount) * 10 ** 24).toLocaleString("fullwide", {
          useGrouping: false,
        }),
      });
    } catch (e) {
      setAlert(true);
      setError(JSON.stringify(e));
    }
    setStakeAndMintLoading("");
    loadAUSDBalance();
    loadStakedBalance();
    loadUnstakedBalance();
  };

  //unstake
  const [unstakeAmount, setUnstake] = useState("100");

  const burnToUnstake = async (event) => {
    event.preventDefault();
    setArtUnstakedBalance("l");
    setArtStakedBalance("l");
    setAusdBalance("l");
    setUnstakeAndBurnLoading("l");
    try {
      await contract.burn_to_unstake({
        unstake_amount: (Number(unstakeAmount) * 10 ** 24).toLocaleString(
          "fullwide",
          { useGrouping: false }
        ),
      });
    } catch (e) {
      setAlert(true);
      setError(JSON.stringify(e));
    }
    setUnstakeAndBurnLoading("");
    loadAUSDBalance();
    loadStakedBalance();
    loadUnstakedBalance();
  };

  // exchange ausd to art
  const [exchangeAUSDtoARTAmount, setExchangeAUSD] = useState("100");

  const exchangeAUSDtoART = async (event) => {
    event.preventDefault();
    setArtUnstakedBalance("l");
    setArtTotalBalance("l");
    setAusdBalance("l");
    setExchangeAUSDLoading("l");
    try {
      await contract.exchange_ausd_to_art({
        ausd_amount: (
          Number(exchangeAUSDtoARTAmount) *
          10 ** 24
        ).toLocaleString("fullwide", { useGrouping: false }),
      });
    } catch (e) {
      setAlert(true);
      setError(JSON.stringify(e));
    }
    setExchangeAUSDLoading("");
    loadAUSDBalance();
    loadTotalBalance();
    loadUnstakedBalance();
  };

  // exchange art to ausd
  const [exchangeARTtoAUSDAmount, setExchangeART] = useState("100");

  const exchangeARTtoAUSD = async (event) => {
    event.preventDefault();
    setArtUnstakedBalance("l");
    setArtTotalBalance("l");
    setAusdBalance("l");
    setExchangeARTLoading("l");
    try {
      await contract.exchange_art_to_ausd({
        amount: (Number(exchangeARTtoAUSDAmount) * 10 ** 24).toLocaleString(
          "fullwide",
          { useGrouping: false }
        ),
      });
    } catch (e) {
      setAlert(true);
      setError(JSON.stringify(e));
    }
    setExchangeARTLoading("");
    loadAUSDBalance();
    loadTotalBalance();
    loadUnstakedBalance();
  };

  //modal
  const [show, setShow] = useState(false);

  // guide
  const [guideShow, setGuideShow] = useState(true);

  // loading pattern
  const maybeLoad = (state, displayFun) => {
    if (state === "l") {
      return <Spinner size="sm" animation="border" />;
    } else {
      return displayFun(state);
    }
  };

  return (
    <div className="art-card">
      {alert && (
        <AlertBanner error={error} setError={setError} setAlert={setAlert} />
      )}

      <Row noGutters className="pb-2" style={{ background: "#f7f7fb" }}>
        <Col>
          <Card className="price">
            <Card.Body>
              <Card.Title>
                <img src={tokenIcon.art} alt="icon" className="icon" />
                {maybeLoad(artPrice, (a) => (Number(a) / 10 ** 8).toFixed(2))} $
              </Card.Title>
              <Card.Text>art</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="price">
            <Card.Body>
              <Card.Title>
                <img src={tokenIcon.aNEAR} alt="icon" className="icon" />
                {maybeLoad(nearPrice, (n) =>
                  (Number(n) / 10 ** 8).toFixed(2)
                )}{" "}
                $
              </Card.Title>
              <Card.Text>aNEAR </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row noGutters className="p-2 mb-2" style={{ background: "#fff" }}>
        <Col className="m-2 p-2" xs="12" md="4">
          <Row noGutters>
            <Col>
              <h5>
                <strong>NEAR</strong>
              </h5>
              <Row noGutters> Account: {currentUser.accountId} </Row>
              <Row noGutters> Balance: {nearBalance} Ⓝ</Row>
            </Col>
          </Row>

          <Row className="mt-2" noGutters>
            <Col>
              <h5>
                <strong>aUSD</strong>
              </h5>
              <Row noGutters>
                Balance:{" "}
                {maybeLoad(ausdBalance, (a) => formatNearWithDecimal(a))} $
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="m-2 p-2" xs="12" md="6">
          <h5>
            <strong>ARTCOIN</strong>
          </h5>
          <Row noGutters className="mb-1">
            Total Balace:{" "}
            {maybeLoad(artTotalBalance, (a) => formatNearWithDecimal(a))} ⓐ
          </Row>

          <Row noGutters className="mb-1">
            Staked Balace:{" "}
            {maybeLoad(artStakedBalance, (a) => formatNearWithDecimal(a))} ⓐ (~
            +
            {maybeLoad(artStakedBalance, (a) =>
              (
                0.000261 * new BN(artStakedBalance).div(UNIT).toNumber()
              ).toFixed(4)
            )}
            /day ⓐ)
            <button className="card-button" onClick={refreshStakingReward}>
              <FcRefresh className="white" />
            </button>
          </Row>

          <Row noGutters className="mb-1">
            Available Balace:{" "}
            {maybeLoad(artUnstakedBalance, (a) => formatNearWithDecimal(a))} ⓐ{" "}
            <button className="card-button" onClick={() => setShow(true)}>
              Transfer
            </button>
            <Modal show={show} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Transfer art to your hoomie</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form style={{ width: "100%" }} onSubmit={transferArt}>
                  <Form.Group controlId="receiver">
                    <Form.Label>Receiver: </Form.Label>
                    <InputGroup className="mb-2">
                      <FormControl
                        value={receiver}
                        onChange={(event) => {
                          if (event) {
                            const value =
                              event.target !== null ? event.target.value : "";
                            setReceiver(value);
                          }
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="sendamount">
                    <Form.Label>Send Amount: </Form.Label>
                    <InputGroup className="mb-2">
                      <FormControl
                        value={transferAmount}
                        onChange={(event) => {
                          if (event) {
                            const value =
                              event.target !== null ? event.target.value : "";
                            setTransferAmount(value);
                          }
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button type="submit">
                    {maybeLoad(transferSubmit, () => "Confirm Transfer")}
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </Col>
      </Row>

      <Row noGutters className="p-2 mb-2 move-right1">
        <Col>
          <Form style={{ width: "80%" }} onSubmit={buyArtWithNear}>
            <Form.Row className="align-items-center">
              <Col className="mx-1" md="6" xs="12">
                <InputGroup className="input-shadow">
                  <InputGroup.Prepend>
                    <InputGroup.Text>art</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={deposit}
                    onChange={(event) => {
                      if (event) {
                        const value =
                          event.target !== null ? event.target.value : "";
                        setDeposit(value);
                      }
                    }}
                  />
                </InputGroup>
              </Col>
              <Col className="mx-1" style={{ textAlign: "start" }}>
                <Button type="submit">Buy art with NEAR token</Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>

      <Row noGutters className="p-2 mb-2 move-right2 ">
        <Col>
          <Form style={{ width: "80%" }} onSubmit={buyAusdWithNear}>
            <Form.Row className="align-items-center">
              <Col className="mx-1" md="6" xs="12">
                <InputGroup className="input-shadow">
                  <InputGroup.Prepend>
                    <InputGroup.Text>aUSD</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    value={deposit_ausd}
                    onChange={(event) => {
                      if (event) {
                        const value =
                          event.target !== null ? event.target.value : "";
                        setDepositAUSD(value);
                      }
                    }}
                  />
                </InputGroup>
              </Col>
              <Col className="mx-1" style={{ textAlign: "start" }}>
                <Button type="submit" className="buy-ausd">
                  Buy aUSD with NEAR token
                </Button>
                {ausdBalance === "0" && guideShow && (
                  <Guide
                    title="Get aUSD"
                    setGuideShow={setGuideShow}
                    nodismiss
                    className="guide-right"
                  />
                )}
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>

      <Row noGutters className="p-2 move-right4 ">
        <Form style={{ width: "80%" }} onSubmit={stakeAndmint}>
          <Form.Row className="align-items-center">
            <Col className="mx-1" md="8">
              <InputGroup className="input-shadow">
                <InputGroup.Prepend>
                  <InputGroup.Text>art</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={stakeAmount}
                  onChange={(event) => {
                    if (event) {
                      const value =
                        event.target !== null ? event.target.value : "";
                      setStake(value);
                    }
                  }}
                />
              </InputGroup>
            </Col>
            <Col className="mx-1" style={{ textAlign: "start" }}>
              <Button type="submit">
                {maybeLoad(stakeAndMintLoading, () => "Stake & Mint")}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>
      <Row noGutters className="p-2 move-right4 ">
        <Form style={{ width: "80%" }} onSubmit={burnToUnstake}>
          <Form.Row className="align-items-center">
            <Col className="mx-1" md="8">
              <InputGroup className="input-shadow">
                <InputGroup.Prepend>
                  <InputGroup.Text>art</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={unstakeAmount}
                  onChange={(event) => {
                    if (event) {
                      const value =
                        event.target !== null ? event.target.value : "";
                      setUnstake(value);
                    }
                  }}
                />
              </InputGroup>
            </Col>
            <Col className="mx-1" style={{ textAlign: "start" }}>
              <Button type="submit">
                {maybeLoad(unstakAndBurnLoading, () => "Burn to Unstake")}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>

      <Row noGutters className="p-2 move-right3 ">
        <Form style={{ width: "80%" }} onSubmit={exchangeAUSDtoART}>
          <Form.Row className="align-items-center">
            <Col className="mx-1" md="8">
              <InputGroup className="input-shadow">
                <InputGroup.Prepend>
                  <InputGroup.Text>art</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={exchangeAUSDtoARTAmount}
                  onChange={(event) => {
                    if (event) {
                      const value =
                        event.target !== null ? event.target.value : "";
                      setExchangeAUSD(value);
                    }
                  }}
                />
              </InputGroup>
            </Col>
            <Col className="mx-1" style={{ textAlign: "start" }}>
              <Button type="submit">
                {maybeLoad(exchangeAUSDLoading, () => "Exchange AUSD to ART")}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>
      <Row noGutters className="p-2 move-right3 ">
        <Form style={{ width: "80%" }} onSubmit={exchangeARTtoAUSD}>
          <Form.Row className="align-items-center">
            <Col className="mx-1" md="8">
              <InputGroup className="input-shadow">
                <InputGroup.Prepend>
                  <InputGroup.Text>art</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={exchangeARTtoAUSDAmount}
                  onChange={(event) => {
                    if (event) {
                      const value =
                        event.target !== null ? event.target.value : "";
                      setExchangeART(value);
                    }
                  }}
                />
              </InputGroup>
            </Col>
            <Col className="mx-1" style={{ textAlign: "start" }}>
              <Button type="submit">
                {maybeLoad(exchangeARTLoading, () => "Exchange ART to AUSD")}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>
    </div>
  );
};

export default ARTCard;
