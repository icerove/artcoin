import { Row, Col } from "react-bootstrap";

import Poster from "../assets/poster.png";
import dollar from "../assets/dollar.png";
import stake from "../assets/stake.png";
import exchange from "../assets/exchange.png";

const LandingPage = ({ signIn }) => {
  const posterTitle = "";
  const posterSubtitle = "";
  const stableCoinText = "";
  const stakeText = "";
  const exchangeText = "";
  return (
    <div style={{ background: "#020024", textAlign: "center" }}>
      <Row noGutters className="mb-5">
        <Col>
          <img src={Poster} />
        </Col>
        <Col>
          <h1>{posterTitle}</h1>
          <h5>{posterSubtitle}</h5>
        </Col>
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
    <div
      style={{
        background: "#1c1c3d",
        height: "300px",
        padding: "10%",
        margin: "5%",
        textAlign: "center",
      }}
    >
      <Row noGutters>
        <img src={icon} />
      </Row>
      <Row noGutters style={{ color: "white", fontWeight: "bold" }}>
        {title}
      </Row>
      <Row noGutters>{text}</Row>
    </div>
  );
};
