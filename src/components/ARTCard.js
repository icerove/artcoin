import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const ARTCard = () => {
    const ARTBalance = '123456'
    const AUSDBalance = '100'
    return (<div className="art-card">
    <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
        ART Wallet
    </Row>
    <Row noGutters className="p-2 mb-2">
        <Col>
            ART Balace: {ARTBalance} 
        </Col>
        <Col>
            <Button variant="primary">Send me some ART</Button>
        </Col>
    </Row>
    <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
        <Col>
            AUSD Balance: {AUSDBalance}
        </Col>
    </Row>
    <Row noGutters className="p-2 mb-2">
        <Button className="mr-5 mb-1">Stake & Mint</Button>
        <Button className="mr-5 mb-1">Burn & Unstake</Button>
        <Button className="mr-5 mb-1">Transfer</Button>
    </Row>
    </div>)
}

export default ARTCard