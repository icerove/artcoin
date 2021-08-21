import React from "react";
import { Alert } from "react-bootstrap";

const AlertBanner = ({ error, setAlert, setError }) => (
  <Alert
    variant={"danger"}
    onClose={() => {
      setAlert(false);
      setError("");
    }}
    dismissible
  >
    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
    <p>Error: {error}. Try again later.</p>
    <p>
      {" "}
      For more information, please have a look at latest transaction at
      https://explorer.testnet.near.org/accounts/art.artcoin.testnet or
      https://explorer.testnet.near.org/accounts/ausd.artcoin.testnet
    </p>
  </Alert>
);

export default AlertBanner;
