import React, {useState, useCallback} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner } from 'react-bootstrap'
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
        {currentUser && 
        <TradeCard 
          contract={contract}
          accountId={currentUser.accountId}
        />}
    </Container>
  );
}

export default App;
