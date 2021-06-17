import React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Logo from "../assets/logo192.png";
import Discord from "../assets/discord.svg";
import Github from "../assets/github.svg";
import Twitter from "../assets/twitter.svg";

const Footer = ({ currentUser }) => {
  return (
    <Row noGutters className="mb-5 pt-2 pb-5 upper-line">
      <Col className="pr-2" md={currentUser ? "4" : "8"} xs="12">
        <NavLink exact to="/" className="text-d">
          <div className="logo-small">
            <div>
              <img className="logo" src={Logo} alt="" />
            </div>
          </div>
        </NavLink>
      </Col>
      {currentUser && (
        <>
          <Col className="p-2">
            <NavLink exact to="/wallet" className="head-item">
              Wallet
            </NavLink>
          </Col>
          <Col className="p-2">
            <NavLink exact to="/trade" className="head-item">
              Exchange
            </NavLink>
          </Col>
          <Col className="p-2">
            <NavLink exact to="/stake" className="head-item">
              Stake
            </NavLink>
          </Col>
        </>
      )}
      <Col className="p-2">
        <NavLink exact to="/markets" className="head-item">
          Markets
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
  );
};

export default Footer;
