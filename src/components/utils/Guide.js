import React from "react";
import { Alert } from "react-bootstrap";

const Guide = ({ title, setGuideShow, actionCount, className, nodismiss }) => {
  const intro = {
    Stake:
      "Firstly, get aUSD from stake page. It is first step to trade other assets on exchange.",
    "Get aUSD":
      "Here is the place to get aUSD. Input reasonable amount and click button, all down.",
    Exchange:
      "After get some aUSD, you can trade many kinds of assets without difficulty on exchange page.",
    Wallet:
      "Check your all different assets on wallet page, but it may take little time to load.",
    Market:
      "Finally, here are the list of all assets with different timescopes. Start your trading journey now, good luck! Click anywhere outside bar to exit.",
  };
  const close = () => {
    localStorage.setItem("guide", actionCount);
    setGuideShow(false);
  };
  return (
    <Alert
      className={className ? "guide " + className : "guide"}
      variant="primary"
      onClose={close}
      dismissible={nodismiss ? false : true}
    >
      <Alert.Heading>{title}</Alert.Heading>
      <p>{intro[title]}</p>
    </Alert>
  );
};

export default Guide;
