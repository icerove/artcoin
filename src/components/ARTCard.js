import React, {useEffect, useState} from 'react';
import { Row, Col, Button, Form, InputGroup, FormControl, Modal, Spinner } from 'react-bootstrap';
import { formatNearAmount } from "near-api-js/lib/utils/format";
import BN from 'bn.js'

const GAS = 300000000000000
const UNIT = new BN('1000000000000000000000000')

const ARTCard = ({currentUser, contract, signIn, signOut, ausdContract}) => {
    const [artTotalBalance, setArtTotalBalance] = useState('l')
    const [artStakedBalance, setArtStakedBalance] = useState('l')
    const [artUnstakedBalance, setArtUnstakedBalance] = useState('l')

    const [ausdBalance, setAusdBalance] = useState('l')
    const [artPrice, setArtPrice] = useState('l')
    const nearBalance = formatNearAmount(currentUser.balance,5)
    const [nearPrice, setNearPrice] = useState('l')
    
    // Button text, '' means show text, 'l' means show spinner
    const [transferSubmit, setTransferSubmit] = useState('')
    const [stakeAndMintLoading, setStakeAndMintLoading ] = useState('')
    const [unstakAndBurnLoading, setUnstakeAndBurnLoading ] = useState('')

    const loadTotalBalance = () => {
        return contract.get_total_balance({owner_id: currentUser.accountId})
                .then((art) => setArtTotalBalance(art))
    }

    const loadUnstakedBalance = () => {
        return contract.get_unstaked_balance({owner_id: currentUser.accountId})
        .then((art) => setArtUnstakedBalance(art))
    }

    const loadStakedBalance = () => {
        return contract.get_staked_balance({account_id: currentUser.accountId})
        .then((art) => setArtStakedBalance(art))
    }

    const loadPrice = () => {
        contract.get_price()
        .then((price) => setArtPrice(price))
    }

    const loadAUSDBalance = () => {
        ausdContract.get_balance({owner_id: currentUser.accountId})
        .then((ausd) => setAusdBalance(ausd))
    }

    const loadNearPrice = () => {
        contract.get_asset_price({asset: 'aNEAR'})
        .then((price) => {
            setNearPrice(price)
        })
    }

    useEffect(() => {
        console.log('hit here')
        loadTotalBalance()
        loadUnstakedBalance()
        loadStakedBalance()
        loadPrice()
        loadAUSDBalance()
        loadNearPrice()
    }, [])
    console.log(contract)
    // deposit
    const [deposit, setDeposit] = useState('10')

    const buyArtWithNear = (event) => {
        event.preventDefault()
        let nearDeposit = new BN(deposit).mul(new BN(artPrice)).mul(UNIT).div(new BN(nearPrice))
        contract.buy_art_with_near({}, GAS, nearDeposit.toString())
    }

    // receiver
    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState('')

    const transferArt = async (event) => {
        event.preventDefault()
        setArtTotalBalance('l')
        setArtUnstakedBalance('l')
        setTransferSubmit('l')
        await contract.transfer({new_owner_id: receiver, amount: amount + '000000000000000000000000'}, GAS)
        setTransferSubmit('')
        setShow(false)
        loadTotalBalance()
        loadUnstakedBalance()
    }

    // stake
    const [stakeAmount, setStake] = useState('1000')

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const stakeAndmint = async (event) => {
        event.preventDefault()
        setArtUnstakedBalance('l')
        setArtStakedBalance('l')
        setAusdBalance('l')
        setStakeAndMintLoading('l')
        await contract.stake_and_mint({stake: stakeAmount + '000000000000000000000000'})
        setStakeAndMintLoading('')
        loadAUSDBalance()
        loadStakedBalance()
        loadUnstakedBalance()
    }

    //unstake
    const [unstakeAmount, setUnstake] = useState('1000')

    const burnToUnstake = async (event) => {
        event.preventDefault()
        setArtUnstakedBalance('l')
        setArtStakedBalance('l')
        setAusdBalance('l')
        setUnstakeAndBurnLoading('l')
        await contract.burn_to_unstake({unstake_amount: unstakeAmount + '000000000000000000000000'})
        setUnstakeAndBurnLoading('')
        loadAUSDBalance()
        loadStakedBalance()
        loadUnstakedBalance()
    }

    //modal
    const [show, setShow] = useState(false);

    const maybeLoad = (state, displayFun) => {
        if (state == 'l') {
           return <Spinner       size="sm"           animation="border" />
        } else {
            return displayFun(state)
        }
    } 

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
                ART Price: {maybeLoad(artPrice, (a) => (Number(a)/10**8).toFixed(2))} $
            </Col>
            <Col>
                NEAR Price: {maybeLoad(nearPrice, (n) => (Number(n)/10**8).toFixed(2))} $
            </Col>
        </Row>
        <Row noGutters className="p-2 mb-2">
            <Col>
                ART Unstaked Balace: {maybeLoad(artUnstakedBalance, (a) => formatNearAmount(a, 5))} ⓐ
            </Col>
            <Col>
                ART Total Balace: {maybeLoad(artTotalBalance, (a) => formatNearAmount(a, 5))} ⓐ {' '}
                <button onClick={() => setShow(true)}>Transfer</button>
                <Modal show={show} onHide={() =>setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Transfer ART to your hoomie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{width: "100%"}} onSubmit={transferArt}>
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
                                {maybeLoad(transferSubmit, (a) => 'Confirm Transfer')}
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
                AUSD Balance: {maybeLoad(ausdBalance, (a) => formatNearAmount(a, 5))} $
            </Col>
            <Col>
                ART Staked Balace: {maybeLoad(artStakedBalance, (a) => formatNearAmount(a, 5))} ⓐ
            </Col>
        </Row>
        <Row noGutters className="p-2 mb-2">
            <Form style={{width: "100%"}} onSubmit={stakeAndmint}>
                <Form.Row className="align-items-center">
                    <Col className="mx-1">
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>ART Amount</InputGroup.Text>
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
                    <Button type="submit">{maybeLoad(stakeAndMintLoading, () => 'Stake & Mint')}</Button>
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
                        <InputGroup.Text>ART Amount</InputGroup.Text>
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
                    <Button type="submit">{maybeLoad(setUnstakeAndBurnLoading, (a) => 'Burn to Unstake')}</Button>
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