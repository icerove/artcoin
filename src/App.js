import React, { useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Spinner } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import ARTCard from "./components/ARTCard";
import TradeCard from "./components/TradeCard";
import Wallet from "./components/Wallet";
import FAQ from "./components/FAQ";
import Docs from "./components/Docs";
import Dash from "./components/Dash";
import Markets from "./components/Markets";
import LandingPage from "./components/LandingPage";

import Header from "./components/Header";

import "./App.css";

const App = ({ contract, currentUser, nearConfig, wallet, ausdContract }) => {
  const [isLoading, setLoading] = useState(false);

  const signIn = useCallback(() => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR art Coin");
  }, [wallet, nearConfig]);

  const signOut = useCallback(() => {
    wallet.signOut();
    setTimeout(setLoading(true), 5000);
    window.location = "/";
    setLoading(false);
  }, [wallet]);

  if (isLoading) {
    return (
      <Container>
        <header>Artificial Coin Network</header>
        <div>
          <Spinner animation="border" size="sm" variant="warning" />
          <Spinner animation="border" size="sm" variant="warning" />
          <Spinner animation="border" size="sm" variant="warning" />
          <Spinner animation="border" variant="warning" />
          <Spinner animation="border" variant="warning" />
          <Spinner animation="border" variant="warning" />
        </div>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <LandingPage signIn={signIn} />}
          />
          <Route
            exact
            path="/faqs"
            render={() => (
              <Container>
                <FAQ />
              </Container>
            )}
          />
          <Route
            exact
            path="/docs"
            render={() => (
              <Container>
                <Docs />
              </Container>
            )}
          />
          <Route
            exact
            path="/markets"
            render={() => (
              <Container>
                <Markets />
              </Container>
            )}
          />
          <Route
            render={() => (
              <h1>
                Not found This page. Please go back to continue or you can
                contact us about the issue.
              </h1>
            )}
          />
        </Switch>
      </div>
    );
  }

  return (
    <Container>
      <Header signOut={signOut} currentUser={currentUser} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Dash contract={contract} accountId={currentUser.accountId} />
          )}
        />
        <Route
          exact
          path="/stake"
          render={() => (
            <ARTCard
              contract={contract}
              currentUser={currentUser}
              ausdContract={ausdContract}
            />
          )}
        />
        <Route
          exact
          path="/trade"
          render={() => (
            <TradeCard contract={contract} accountId={currentUser.accountId} />
          )}
        />
        <Route
          exact
          path="/wallet"
          render={() => (
            <Wallet
              contract={contract}
              accountId={currentUser.accountId}
              ausdContract={ausdContract}
            />
          )}
        />
        <Route exact path="/faqs" component={FAQ} />
        <Route exact path="/docs" component={Docs} />
        <Route exact path="/markets" component={Markets} />
        <Route
          render={() => (
            <h1>
              Not found This page. Please go back to continue or you can contact
              us about the issue.
            </h1>
          )}
        />
      </Switch>
    </Container>
  );
};

export default App;
