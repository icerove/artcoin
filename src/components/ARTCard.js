import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Form, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { formatNearAmount } from "near-api-js/lib/utils/format";
import BN from 'bn.js'

const GAS = 300000000000000
const UNIT = new BN('1000000000000000000000000')

const ARTCard = ({currentUser, contract, signIn, signOut, ausdContract}) => {
    const [artTotalBalance, setArtTotalBalance] = useState('0')
    const [artStakedBalance, setArtStakedBalance] = useState('0')
    const [artUnstakedBalance, setArtUnstakedBalance] = useState('0')

    const [ausdBalance, setAusdBalance] = useState('0')
    const [artPrice, setArtPrice] = useState('0')
    const nearBalance = formatNearAmount(currentUser.balance,5)
    const [nearPrice, setNearPrice] = useState('0')

    useEffect(() => {
        contract.get_total_balance({owner_id: currentUser.accountId})
        .then((art) => setArtTotalBalance(art))
        contract.get_unstaked_balance({owner_id: currentUser.accountId})
        .then((art) => setArtUnstakedBalance(art))
        contract.get_staked_balance({account_id: currentUser.accountId})
        .then((art) => setArtStakedBalance(art))
        contract.get_price()
        .then((price) => setArtPrice(price))
        ausdContract.get_balance({owner_id: currentUser.accountId})
        .then((ausd) => setAusdBalance(ausd))
        contract.get_asset_price({asset: 'aNEAR'})
        .then((price) => {
            setNearPrice(price)
        })
    })
    
    // deposit
    const [deposit, setDeposit] = useState('10')

    const buyArtWithNear = (event) => {
        event.preventDefault()
        let nearDeposit = new BN(deposit).mul(new BN(artPrice)).mul(UNIT).div(new BN(nearPrice))
        console.log(nearDeposit.toString())
        contract.buy_art_with_near({}, GAS, nearDeposit.toString())
    }

    // receiver
    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState('')

    const transfer = (event) => {
        event.preventDefault()
        console.log(amount)
        console.log(receiver)
        contract.transfer({new_owner_id: receiver, amount: amount + '000000000000000000000000'}, GAS)
    }

    // stake
    const [stakeAmount, setStake] = useState('1000')

    const stakeAndmint = (event) => {
        event.preventDefault()
        contract.stake_and_mint({stake: stakeAmount + '000000000000000000000000'})
    }

    //unstake
    const [unstakeAmount, setUnstake] = useState('1000')

    const burnToUnstake = (event) => {
        event.preventDefault()
        contract.burn_to_unstake({unstake_amount: unstakeAmount + '000000000000000000000000'})
    }

    //modal
    const [show, setShow] = useState(false);

    return (<div className="art-card">
    <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
        <Col>NEAR Wallet : {currentUser.accountId} </Col>
        <Col>NEAR Balance: {nearBalance} Ⓝ</Col>
        <Col style={{textAlign: 'end'}}>
            {currentUser && <button onClick={signOut}>Log Out</button>}
        </Col>
    </Row>
    {currentUser !== undefined ?
    <> 
        <Row noGutters style={{fontSize:"12px"}} className="p-2 mb-2">
            After staking every $5 value of ART, you will mint 1 aUSD. In reverse, after burning 1 aUSD, you will get $5 value of ART back.
        </Row>
        <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
            <Col>
                ART Price: {(Number(artPrice)/10**8).toFixed(2)} $
            </Col>
            <Col>
                NEAR Price: {(Number(nearPrice)/10**8).toFixed(2)} $
            </Col>
        </Row>
        <Row noGutters className="p-2 mb-2">
            <Col>
                ART Unstaked Balace: {formatNearAmount(artUnstakedBalance, 5)} ⓐ
            </Col>
            <Col>
                ART Total Balace: {formatNearAmount(artTotalBalance, 5)} ⓐ {' '}
                <button onClick={() => setShow(true)}>Transfer</button>
                <Modal show={show} onHide={() =>setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transfer ART to your hoomie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{width: "100%"}} onSubmit={transfer}>
                            <Form.Group controlId="receiver">
                                <Form.Label>Receiver: </Form.Label>
                                <InputGroup className="mb-2" >
                                    <FormControl 
                                        value={receiver}
                                        onChange={(event) => {
                                            if (event) {
                                                const value = event.target !== null ? event.target.value : "";
                                                setReceiver(value)
                                            }
                                        }} 
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="sendamount">
                                <Form.Label>Send Amount: </Form.Label>
                                <InputGroup className="mb-2" >
                                    <FormControl 
                                        value={amount}
                                        onChange={(event) => {
                                            if (event) {
                                                const value = event.target !== null ? event.target.value : "";
                                                setAmount(value)
                                            }
                                        }} 
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Button type="submit">
                                Confirm Transfer
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShow(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </Row>
        <Row noGutters className="p-2 mb-2">
            <Col>
                <Form style={{width: "100%"}} onSubmit={buyArtWithNear}>
                    <Form.Row className="align-items-center">
                        <Col className="mx-1">
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>ART Amount</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl  
                                value={deposit}
                                onChange={(event) => {
                                    if (event) {
                                        const value = event.target !== null ? event.target.value : "";
                                        setDeposit(value)
                                    }
                                }} />
                        </InputGroup>
                        </Col>
                        <Col className="mx-1" style={{textAlign: 'end'}}>
                        <Button type="submit">Buy ART with NEAR token</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>
        </Row>
        <Row noGutters className="p-2 mb-2" style={{background: '#fff'}}>
            <Col>
                AUSD Balance: {formatNearAmount(ausdBalance, 5)} $
            </Col>
            <Col>
                ART Staked Balace: {formatNearAmount(artStakedBalance, 5)} ⓐ
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
                            value={stakeAmount}
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
                            value={unstakeAmount}
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