import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import dollar from "../assets/dollar.png";
import stake from "../assets/stake.png";
import exchange from "../assets/exchange.png";
import Logo from "../assets/logo192.png";
import Poster from "../assets/poster.png";

import Discord from "../assets/discord.svg";
import Github from "../assets/github.svg";
import Twitter from "../assets/twitter.svg";

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
    <div style={{ background: "#020024" }}>
      <div className="landing">
        <Row noGutters className="p-4 line">
          <Col md="9" xs="12">
            <NavLink exact to="/" className="text-d">
              <div className="logo-small">
                <div>
                  <img className="logo" src={Logo} alt="" />
                </div>
                <div className="land-title">ARTCOIN NETWORK</div>
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
        <Row noGutters className="p-3 m-5" className="poster">
          <Col className="landing-poster d-none d-lg-block">
            <img src={Poster} alt="" />
          </Col>
          <Col className="p-5 landing-text">
            <div>
              <h1 className="title-weight">{posterTitle}</h1>
            </div>
            <div style={{ color: "gray" }}>
              <p>{posterSubtitle}</p>
            </div>
            <div style={{ width: "100%", height: "50%", marginTop: "30px" }}>
              <button className="btnl " onClick={signIn}>
                Get Started
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <Row noGutters className="p-5 upper-line line">
        <Row style={{ width: "100%", textAlign: "center", color: "white" }}>
          <h1 style={{ width: "100%" }}>Features</h1>
          <p style={{ width: "100%" }}>the best exchange you every try</p>
        </Row>
        <Row>
          <Col xs="12" md="4">
            <Card icon={dollar} title="Stable Coin" text={stableCoinText} />
          </Col>
          <Col xs="12" md="4">
            <Card icon={stake} title="Stake and Earn" text={stakeText} />
          </Col>
          <Col xs="12" md="4">
            <Card icon={exchange} title="Exchange" text={exchangeText} />
          </Col>
        </Row>
      </Row>
      <Row noGutters className="p-4">
        <Col md="8" xs="12">
          <NavLink exact to="/" className="text-d">
            <div className="logo-small">
              <div>
                <img className="logo" src={Logo} alt="" />
              </div>
            </div>
          </NavLink>
        </Col>
        <Col className="p-1">
          <NavLink exact to="/markets" className="land-item">
            Markets
          </NavLink>
        </Col>
        <Col className="p-1">
          <NavLink exact to="/faqs" className="land-item">
            FAQs
          </NavLink>
        </Col>
        <Col className="p-1">
          <NavLink exact to="/docs" className="land-item">
            DOCs
          </NavLink>
        </Col>
        <Col className="p-1">
          <div className="blue">
            <a href="https://discord.gg/b2qvhGg8">
              <img
                src={Discord}
                alt="Discord"
                className="commute"
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
          </div>
        </Col>
        <Col className="p-1">
          <div className="blue">
            <a href="https://github.com/Artcoin-Network">
              <img
                src={Github}
                alt="Github"
                className="commute"
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
          </div>
        </Col>
        <Col className="p-1">
          <div className="blue">
            <a href="https://twitter.com/ArtcoinNetwork">
              <img
                src={Twitter}
                alt="Twitter"
                className="commute"
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
          </div>
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
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "10px",
        }}
      >
        <Col md="4">
          <img src={icon} className="card-text" />
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
