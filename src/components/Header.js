import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Logo from "../assets/logo192.png";

const Header = ({ currentUser, signOut }) => {
  if (!currentUser) {
    return <h3 style={{ textAlign: "center" }}>ARTIFICIAL EXCHANGE</h3>;
  }
  return (
    <Row noGutters className="mb-5">
      <Col className="pr-2">
        <NavLink exact to="/" className="head-item">
          <div style={{ display: "flex" }}>
            <div>
              <img className="logo" src={Logo} alt="" />
            </div>
            <div className="head-title">ARTIFICIAL EXCHANGE</div>
          </div>
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink exact to="/markets" className="head-item">
          Markets
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink exact to="/wallet" className="head-item">
          Wallet
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink exact to="/trade" className="head-item">
          Trade
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink exact to="/stake" className="head-item">
          Stake
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink exact to="/faqs" className="head-item">
          FAQs
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink exact to="/docs" className="head-item">
          DOCs
        </NavLink>
      </Col>
      <Col onClick={signOut} className="p-2">
        <button onClick={signOut}>Sign Out</button>
      </Col>
    </Row>
  );
};

export default Header;
