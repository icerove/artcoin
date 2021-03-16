import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const ARTCard = ({currentUser, contract, signIn, signOut}) => {
    const ARTBalance = '123456'
    const AUSDBalance = '100'
    return (<div className="art-card">
    <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
        <Col>ART Wallet</Col>
        <Col style={{textAlign: 'end'}}>
            {currentUser ? <button onClick={signOut}>Log Out</button> :
            <button onClick={signIn}>Log In</button>}
        </Col>
    </Row>
    {currentUser !== undefined ?
    <> 
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
    </>
    : <Row noGutters className="p-5">
        Welcome to ART Wallet, please login with your near account to start
        </Row>}
    </div>)
}

export default ARTCard