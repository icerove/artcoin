import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { formatNearAmount } from "near-api-js/lib/utils/format";
import BN from 'bn.js';

const ARTCard = ({currentUser, contract, signIn, signOut, ausdContract}) => {
    const [artBalace, setArtBalance] = useState('0')
    const [ausdBalance, setAusdBalance] = useState('0')
    const [artPrice, setArtPrice] = useState('0')
    const nearBalance = formatNearAmount(currentUser.balance,5)
    const [stakeAmount, setStake] = useState('0')
    const [unstakeAmount, setUnstake] = useState('0')

    useEffect(() => {
        contract.get_total_balance({owner_id: currentUser.accountId})
        .then((art) => setArtBalance(art))
        contract.get_price()
        .then((price) => setArtPrice(price))
        ausdContract.get_balance({owner_id: currentUser.accountId})
        .then((ausd) => setAusdBalance(ausd))
    })

    const getSomeART = () => {
        contract.get_some_art()
    }

    const stakeAndmint = (event) => {
        event.preventDefault()
        contract.stake_and_mint({stake: stakeAmount + '000000000000000000000000'})
    }

    const burnToUnstake = (event) => {
        event.preventDefault()
        contract.burn_to_unstake({unstake_amount: unstakeAmount + + '000000000000000000000000'})
    }

    return (<div className="art-card">
    <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
        <Col>ART Wallet : {currentUser.accountId} </Col>
        <Col>NEAR Balance: {nearBalance} Ⓝ</Col>
        <Col style={{textAlign: 'end'}}>
            {currentUser ? <button onClick={signOut}>Log Out</button> :
            <button onClick={signIn}>Log In</button>}
        </Col>
    </Row>
    {currentUser !== undefined ?
    <> 
        <Row noGutters className="p-2 mb-2">
            <Col>
                ART Balace: {formatNearAmount(artBalace, 5)} ⓐ
            </Col>
            <Col style={{textAlign: 'end'}}>
                <Button variant="primary" onClick={getSomeART}>Send me some ART</Button>
            </Col>
        </Row>
        <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
            <Col>
                ART Price: {(Number(artPrice)/10**8).toFixed(2)} $
            </Col>
            <Col>
                AUSD Balance: {formatNearAmount(ausdBalance, 5)} $
            </Col>
        </Row>
        <Row noGutters className="p-2 mb-2">
            <Form style={{width: "100%"}} onSubmit={stakeAndmint}>
                <Form.Row className="align-items-center">
                    <Col className="mx-1">
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Amount</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl  
                            value="1000"
                            onChange={(event) => {
                                if (event) {
                                    const value = event.target !== null ? event.target.value : "";
                                    setStake(value)
                                  }
                            }} />
                    </InputGroup>
                    </Col>
                    <Col className="mx-1" style={{textAlign: 'end'}}>
                    <Button type="submit">Stake & Mint</Button>
                    </Col>
                </Form.Row>
            </Form>
        </Row>
        <Row noGutters className="p-2 mb-2">
            <Form style={{width: "100%"}} onSubmit={burnToUnstake}>
                <Form.Row className="align-items-center">
                    <Col className="mx-1">
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Amount</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            value="1000"
                            onChange={(event) => {
                                if (event) {
                                    const value = event.target !== null ? event.target.value : "";
                                    setUnstake(value)
                                  }
                            }}
                         />
                    </InputGroup>
                    </Col>
                    <Col className="mx-1" style={{textAlign: 'end'}}>
                    <Button type="submit">Burn to Unstake</Button>
                    </Col>
                </Form.Row>
            </Form>
        </Row>
    </>
    : <Row noGutters className="p-5">
        Welcome to ART Wallet, please login with your near account to start
        </Row>}
    </div>)
}

export default ARTCard