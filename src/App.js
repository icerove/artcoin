import React, {useState, useCallback} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner } from 'react-bootstrap'
import ARTCard from './components/ARTCard'
import TradeCard from './components/TradeCard'

import './App.css'

const App = ({ contract, currentUser, nearConfig, wallet }) => {

  const signIn = useCallback(() => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR ART Coin");
  }, [wallet, nearConfig]);

  const signOut = useCallback(() => {
    wallet.signOut();
    window.location = "/";
    setLoading(false);
  }, [wallet]);

  return (
    <Container>
      <header>ART Coin Exchange</header>
        <ARTCard 
          currentUser={currentUser} 
          contract={contract}
          signIn={signIn}
          signOut={signOut}
        />
        <hr />
        {currentUser && <TradeCard contract={contract}/>}
    </Container>
  );
}

export default App;
