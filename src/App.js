import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import ARTCard from './components/ARTCard'
import TradeCard from './components/TradeCard'

import './App.css'

const App = () => {
  return (
    <Container>
      <header>ART Coin Exchange</header>
        <ARTCard />
        <hr />
        <TradeCard />
    </Container>
  );
}

export default App;
