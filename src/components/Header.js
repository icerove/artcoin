import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Logo from "../assets/logo192.png";

const Header = ({ currentUser, signOut, signIn }) => {
  return (
    <Row noGutters className="mb-1 pb-2 line">
      <Col className="pr-2" md={currentUser ? "4" : "7"} xs="12">
        <NavLink exact to="/" className="text-d">
          <div className="logo-small">
            <div>
              <img className="logo" src={Logo} alt="" />
            </div>
            <div className="head-title">ARTCOIN NETWORK</div>
          </div>
        </NavLink>
      </Col>
      {currentUser && (
        <>
          <Col className="p-2">
            <NavLink
              exact
              to="/wallet"
              activeClassName="head-selected"
              className="head-item"
            >
              Wallet
            </NavLink>
          </Col>
          <Col className="p-2">
            <NavLink
              exact
              to="/trade"
              activeClassName="head-selected"
              className="head-item"
            >
              Exchange
            </NavLink>
          </Col>
          <Col className="p-2">
            <NavLink
              exact
              to="/stake"
              activeClassName="head-selected"
              className="head-item"
            >
              Stake
            </NavLink>
          </Col>
        </>
      )}
      <Col className="p-2">
        <NavLink
          exact
          to="/markets"
          activeClassName="head-selected"
          className="head-item"
        >
          Markets
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink
          exact
          to="/faqs"
          activeClassName="head-selected"
          className="head-item"
        >
          FAQs
        </NavLink>
      </Col>
      <Col className="p-2">
        <NavLink
          exact
          to="/docs"
          activeClassName="head-selected"
          className="head-item"
        >
          DOCs
        </NavLink>
      </Col>
      {currentUser ? (
        <Col className="p-2">
          <button onClick={signOut}>Sign Out</button>
        </Col>
      ) : (
        <Col className="p-2">
          <button onClick={signIn}>Log In</button>
        </Col>
      )}
    </Row>
  );
};

export default Header;
