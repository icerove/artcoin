import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import dollar from "../assets/dollar.png";
import stake from "../assets/stake.png";
import exchange from "../assets/exchange.png";
import Logo from "../assets/logo192.png";

const LandingPage = ({ signIn }) => {
  const posterTitle = "THE DERIVATIVES LIQUIDITY PROTOCOL";
  const posterSubtitle =
    "Synthetix is the backbone for derivatives trading in DeFi, allowing anyone, anywhere to gain on-chain exposure to a vast range of assets.  ";
  const stableCoinText =
    "Decentralized asset management protocol connecting the world’s best investment managers with investors on the Ethereum blockchain in a permissionless, non-custodial, trustless fashion.";
  const stakeText =
    "Decentralized asset management protocol connecting the world’s best investment managers with investors on the Ethereum blockchain in a permissionless, non-custodial, trustless fashion.";
  const exchangeText =
    "Decentralized asset management protocol connecting the world’s best investment managers with investors on the Ethereum blockchain in a permissionless, non-custodial, trustless fashion.";
  return (
    <div className="landing">
      <Row noGutters className="p-3 line">
        <Col md="9" xs="6">
          <NavLink exact to="/" className="land-item">
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
      <Row noGutters className="mb-5 pt-5 poster">
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
      <Row noGutters style={{ width: "100%", margin: "auto" }}>
        <img src={icon} />
      </Row>
      <Row
        noGutters
        style={{ color: "white", fontWeight: "bold", width: "100%" }}
      >
        {title}
      </Row>
      <Row noGutters>{text}</Row>
    </div>
  );
};
