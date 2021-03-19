import React, {useState, useCallback} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner, Row } from 'react-bootstrap'
import ARTCard from './components/ARTCard'
import TradeCard from './components/TradeCard'

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

  if(!currentUser) {
    return (
      <Container>
      <header>ART Coin Exchange</header>
      <Row noGutters style={{height: '50px'}}>
        Welcome to ART coin, please log in with NEAR wallet to start journey!
      </Row>
      <button onClick={signIn}>Log In</button>
    </Container>
    )
  }

  return (
    <Container>
      <header>ART Coin Exchange</header>
        <ARTCard 
          ausdContract={ausdContract}
          currentUser={currentUser} 
          contract={contract}
          signIn={signIn}
          signOut={signOut}
        />
        <hr />
        <TradeCard 
          contract={contract}
          accountId={currentUser.accountId}
        />
    </Container>
  );
}

export default App;
