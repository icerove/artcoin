import React from 'react'
import { Row, Col, Button, Form, FormControl, InputGroup } from 'react-bootstrap'

const TradeCard = () => {
    const ausdValue = 123456
    const abtcValue = 345
    const usdValue = 12345
    return <div className="trade-card">
    <Row noGutters className="p-2" style={{background: '#fff'}}>
       <Col>BUY/SELL</Col> 
       <Col>
            <button>Reverse</button>
       </Col>
    </Row>
    <Row noGutters className="p-2 pb-3">
        <Form>
            <Form.Group controlId="formSell">
                <Form.Label>SELL: </Form.Label>
                <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text>AUSD</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="0" />
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