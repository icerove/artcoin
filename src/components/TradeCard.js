import React, {useState, useEffect} from 'react'
import { Row, Col, Button, Form, FormControl, InputGroup } from 'react-bootstrap'

const tokenList = ['aNEAR', 'aBTC','aGOLD', 'aSPY', 'aEUR']
const TradeCard = ({contract, accountId}) => {
    const [aNEARP, setaNEARPrice] = useState('0')
    const [aBTCP, setaBTPrice] = useState('0')
    const [aGoldP, setaGOLDPrice] = useState('0')
    const [aSPYP, setaSPYPrice] = useState('0')
    const [aEURP, setaEURPrice] = useState('0')

    const [aNEARb, setaNEARbalance] = useState('0')
    const [aBTCb, setaBTbalance] = useState('0')
    const [aGoldb, setaGOLDbalance] = useState('0')
    const [aSPYb, setaSPYbalance] = useState('0')
    const [aEURb, setaEURbalance] = useState('0')

    useEffect(() => {
        contract.get_asset_price({asset: 'aNEAR'})
        .then((price) =>setaNEARPrice(price))
        contract.get_asset_price({asset: 'aBTC'})
        .then((price) =>setaBTPrice(price))
        contract.get_asset_price({asset: 'aGOLD'})
        .then((price) =>setaGOLDPrice(price))
        contract.get_asset_price({asset: 'aSPY'})
        .then((price) =>setaSPYPrice(price))
        contract.get_asset_price({asset: 'aEUR'})
        .then((price) =>setaEURPrice(price))

        contract.get_asset_balance({asset: 'aNEAR'})
        .then((balance) =>setaNEARbalance(balance))
        contract.get_asset_price({asset: 'aBTC'})
        .then((balance) =>setaBTbalance(balance))
        contract.get_asset_price({asset: 'aGOLD'})
        .then((balance) =>setaGOLDbalance(balance))
        contract.get_asset_price({asset: 'aSPY'})
        .then((balance) =>setaSPYbalance(balance))
        contract.get_asset_price({asset: 'aEUR'})
        .then((balance) =>setaEURbalance(balance))
    })


    return <div className="trade-card">
    <Row noGutters className="p-2" style={{background: '#fff'}}>
       <Col>BUY/SELL</Col> 
       <Col>
            <button>Reverse</button>
       </Col>
    </Row>
    <Row noGutters className="p-2 pb-3">
        <Form style={{width: '100%'}}>
            <Form.Group controlId="formSell">
                <Form.Label>SELL: </Form.Label>
                <InputGroup className="mb-2" >
                    <InputGroup.Prepend>
                    <InputGroup.Text>AUSD</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value="0" />
                    <p style={{margin: 'auto 5px', verticalAlign:'baseline'}}>Balace: {ausdValue}</p>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBuy">
                <Form.Label>BUY: </Form.Label>
                <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text>ABTC</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="0" />
                    <p style={{margin: 'auto 5px', verticalAlign:'baseline'}}>Balace: {abtcValue}</p>
                </InputGroup>
            </Form.Group>

            <Row className="mb-2">
                <Col>USD VALUE</Col>
                <Col>${usdValue}</Col>
            </Row>

            <Button variant="primary" type="submit">
                CONFIRM TRADE
            </Button>
        </Form>
    </Row>
    </div>
}

export default TradeCard

