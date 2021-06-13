import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import dollar from "../assets/dollar.png";
import stake from "../assets/stake.png";
import exchange from "../assets/exchange.png";
import Logo from "../assets/logo192.png";

const LandingPage = ({ signIn }) => {
  const posterTitle = "Trade Artificial Assets Instantly with Low Fee";
  const posterSubtitle =
    "ArtCoin Network is an extremely flat transaction fee (several cents), instantly settlement (seconds) artificial assets trading platform. Allowing anyone, anywhere to trade a vast range of assets of cryptocurrencies, stocks, indexes and commodities.";
  const stableCoinText =
    "aUSD is the native, decentralized stable coin in ArtCoin Network Platform. It's used to value all other artificial assets.";
  const stakeText =
    "Staking Art Coin, the governance token of ArtCoin Network Platform to mint aUSD and earn staking rewards.";
  const exchangeText =
    "Exchange between any kind of assets without compliance concerns. Trade with infinite liquidity, extremely low fee and instant settlement.";
  return (
    <div className="landing">
      <Row noGutters className="p-2 line">
        <Col md="9" xs="6">
          <NavLink exact to="/" className="text-d">
            <div style={{ display: "flex" }}>
              <div>
                <img className="logo" src={Logo} alt="" />
              </div>
              <div className="land-title">ARTIFICIAL EXCHANGE</div>
            </div>
          </NavLink>
        </Col>
        <Col className="p-2">
          <NavLink exact to="/markets" className="land-item">
            Markets
          </NavLink>
        </Col>
        <Col className="p-2">
          <NavLink exact to="/faqs" className="land-item">
            FAQs
          </NavLink>
        </Col>
        <Col className="p-2">
          <NavLink exact to="/docs" className="land-item">
            DOCs
          </NavLink>
        </Col>
      </Row>
      <Row noGutters className="p-6 poster">
        <div style={{ width: "100%" }}>
          <h1 className="landing-text title-weight">{posterTitle}</h1>
        </div>
        <div style={{ width: "100%", color: "gray" }}>
          <p className="landing-text">{posterSubtitle}</p>
        </div>
        <div style={{ width: "100%" }}>
          <button className="btnl landing-text" onClick={signIn}>
            Get Started
          </button>
        </div>
      </Row>
      <Row className="p-2 m-5" noGutters>
        <Col>
          <Card icon={dollar} title="Stable Coin" text={stableCoinText} />
        </Col>
        <Col>
          <Card icon={stake} title="Stake and Earn" text={stakeText} />
        </Col>
        <Col>
          <Card icon={exchange} title="Exchange" text={exchangeText} />
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;

const Card = ({ icon, title, text }) => {
  return (
    <div className="fancy-border card-container">
      <Row
        noGutters
        style={{ width: "100%", margin: "auto", marginBottom: "10px" }}
      >
        <Col md="4">
          <img src={icon} />
        </Col>
        <Col
          style={{
            color: "#348ee2",
            fontWeight: "bolder",
            fontSize: "1.5rem",
            paddingTop: "20px",
          }}
        >
          {title}
        </Col>
      </Row>
      <Row noGutters className="mt-3">
        {text}
      </Row>
    </div>
  );
};
