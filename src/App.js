import React, {useState, useCallback} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner, Row } from 'react-bootstrap'
import { Route, Switch } from "react-router-dom";

import ARTCard from './components/ARTCard'
import TradeCard from './components/TradeCard'
import Dash from './components/Dash'
import Header from './components/Header'
 
import './App.css'

const App = ({ contract, currentUser, nearConfig, wallet, ausdContract }) => {
  const [isLoading, setLoading] = useState(false);

  const signIn = useCallback(() => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR ART Coin");
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
      <header>ART Coin Exchange</header>
      <div>
      <Spinner animation="border" size="sm" variant="warning"/>
      <Spinner animation="border" size="sm" variant="warning"/>
      <Spinner animation="border" size="sm" variant="warning"/>
      <Spinner animation="border" variant="warning"/>
      <Spinner animation="border" variant="warning"/>
      <Spinner animation="border" variant="warning"/>
      </div>
    </Container>
    )
  }
  console.log(currentUser)
  if(!currentUser) {
    return (
      <Container>
        <Header signIn={signIn} signOut={signOut} currentUser={currentUser} />
        <Row noGutters style={{height: '50px'}}>
          Welcome to ART coin, please log in with NEAR wallet to start journey!
        </Row>
        <button onClick={signIn}>Log In</button>
      </Container>
    )
  }

  return (
    <Container>
      <Header signIn={signIn} signOut={signOut} currentUser={currentUser} />
      <Switch>
        <Route exact path="/" 
          render={() => <Dash contract={contract} accountId={currentUser.accountId}/>}/>
        <Route exact path="/stake" 
          render={() => <ARTCard contract={contract} currentUser={currentUser} ausdContract={ausdContract} />} />
        <Route exact path="/trade" 
          render={() => <TradeCard contract={contract} accountId={currentUser.accountId}/>}/>
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
}

export default App;
