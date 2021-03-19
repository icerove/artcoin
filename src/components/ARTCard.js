import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Form, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { formatNearAmount } from "near-api-js/lib/utils/format";

const ARTCard = ({currentUser, contract, signIn, signOut, ausdContract}) => {
    const [artTotalBalance, setArtTotalBalance] = useState('0')
    const [artStakedBalance, setArtStakedBalance] = useState('0')
    const [artUnstakedBalance, setArtUnstakedBalance] = useState('0')

    const [ausdBalance, setAusdBalance] = useState('0')
    const [artPrice, setArtPrice] = useState('0')
    const nearBalance = formatNearAmount(currentUser.balance,5)
    const [stakeAmount, setStake] = useState('1000')
    const [unstakeAmount, setUnstake] = useState('1000')

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
    })

    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState('')

    const buyArtWithNear = () => {
        console.log("buy art with near")
        // contract.buy_art_with_near()
    }

    const transfer = () => {
        console.log("transfer")
        contract.transfer({new_owner_id: receiver, amount: amount + '000000000000000000000000'})
    }

    const stakeAndmint = (event) => {
        event.preventDefault()
        contract.stake_and_mint({stake: stakeAmount + '000000000000000000000000'})
    }

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
            {currentUser ? <button onClick={signOut}>Log Out</button> :
            <button onClick={signIn}>Log In</button>}
        </Col>
    </Row>
    {currentUser !== undefined ?
    <> 
        <Row noGutters className="p-2 mb-2">
            <Col>
                ART Unstaked Balace: {formatNearAmount(artUnstakedBalance, 5)} ⓐ <br/>
                ART Staked Balace: {formatNearAmount(artStakedBalance, 5)} ⓐ
            </Col>
            <Col>
                ART Total Balace: {formatNearAmount(artTotalBalance, 5)} ⓐ
            </Col>

        </Row>
        <Row noGutters className="p-2 mb-2">
            <Col>
                <Button variant="primary" onClick={buyArtWithNear}>Buy ART with NEAR token</Button>
            </Col>
            <Col>
                <Button variant="primary" onClick={() => setShow(true)}>Transfer</Button>
                <Modal show={show} onHide={() =>setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transfer ART to your hoomie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{width: "100%"}} onSubmit={stakeAndmint}>
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
                                <Form.Label>Send Amount </Form.Label>
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

                            <Button type="submit" onClick={transfer}>
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