import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Logo from "../assets/logo192.png";
import Guide from "./utils/Guide";

const Header = ({ currentUser, signOut, signIn }) => {
  const [guideShow, setGuideShow] = useState(true);
  const [guideExchangeShow, setGuideExchangeShow] = useState(true);
  const [guideWalletShow, setGuideWalletShow] = useState(true);
  const [guideMarketShow, setGuideMarketShow] = useState(true);
  console.log(localStorage.getItem("ausd"));
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
              className="head-item wallet"
            >
              Wallet
              {localStorage.getItem("guide") === "2" && guideWalletShow && (
                <Guide
                  title="Wallet"
                  setGuideShow={setGuideWalletShow}
                  actionCount="3"
                />
              )}
            </NavLink>
          </Col>
          <Col className="p-2">
            <NavLink
              exact
              to="/trade"
              activeClassName="head-selected"
              className="head-item exchange"
            >
              Exchange
              {localStorage.getItem("ausd") === "true" &&
                localStorage.getItem("guide") === "1" &&
                guideExchangeShow && (
                  <Guide
                    title="Exchange"
                    setGuideShow={setGuideExchangeShow}
                    actionCount="2"
                  />
                )}
            </NavLink>
          </Col>
          <Col className="p-2">
            <NavLink
              exact
              to="/stake"
              activeClassName="head-selected"
              className="head-item stake"
            >
              Stake
              {localStorage.getItem("guide") === "0" && guideShow && (
                <Guide
                  title="Stake"
                  setGuideShow={setGuideShow}
                  actionCount="1"
                />
              )}
            </NavLink>
          </Col>
        </>
      )}
      <Col className="p-2">
        <NavLink
          exact
          to="/markets"
          activeClassName="head-selected"
          className="head-item markets"
        >
          Markets
          {localStorage.getItem("guide") === "3" && guideMarketShow && (
            <Guide
              title="Market"
              setGuideShow={setGuideMarketShow}
              actionCount="4"
            />
          )}
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
