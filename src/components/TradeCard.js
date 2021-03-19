import React, {useState, useEffect} from 'react'
import { Row, Col, Button, Form, FormControl, InputGroup, Accordion, Card } from 'react-bootstrap'
import { formatNearAmount } from "near-api-js/lib/utils/format"

const GAS = 300000000000000

const TradeCard = ({contract, accountId}) => {

    const [assetP, setAssetP] = useState({'aNEAR':'0', 'aBTC':'0', 'aGOLD':'0', 'aSPY':'0', 'aEUR':'0'})
    const [assetB, setAssetB] = useState({'aNEAR':'0', 'aBTC':'0', 'aGOLD':'0', 'aSPY':'0', 'aEUR':'0'})
    const [currentAsset, setCurrentAsset] = useState("aBTC")

    useEffect(() => {
        contract.get_asset_price({asset: 'aBTC'})
        .then((price) => {
            setAssetP({...assetP,'aBTC': price})
        })

        contract.get_asset_balance({account_id: accountId, asset: 'aBTC'})
        .then((balance) =>setAssetB({...assetB, 'aBTC': balance}))
        
    }, [])

    const assetItems = Object.entries(assetB).map(([k, _]) =>
        <option key={k}>
        {k}
        </option>
    )

    const [buyAmount, setBuyAmount] = useState({asset: '0', aUSD: '0'})

    const [sellAmount, setSellAmount] = useState({asset:'0', aUSD: '0'})

    const buyAssetWithAusd = (event) => {
        event.preventDefault()
        let amount = (Number(buyAmount.asset)*(10**24)).toLocaleString('fullwide', {useGrouping:false})
        contract.buy_asset_with_ausd({asset: currentAsset, asset_amount: amount}, GAS)
    }

    const sellAssettoAusd = (event) => {
        event.preventDefault()
        let amount = (Number(sellAmount.asset)*(10**24)).toLocaleString('fullwide', {useGrouping:false})
        contract.sell_asset_to_ausd({asset: currentAsset, asset_amount: amount}, GAS)
    }

    return <div className="trade-card">
    <Row noGutters className="p-2" style={{background: '#fff'}}>
       <Col>BUY/SELL</Col> 
       <Col>
            <Form.Group controlId="formSelect">
                <Form.Control 
                    value={currentAsset} 
                    as="select" 
                    onChange={(event) => {
                        if (event) {
                            const value = event.target !== null ? event.target.value : "";
                            setCurrentAsset(value)
                            contract.get_asset_price({asset: value})
                            .then((price) => {
                                setAssetP({...assetP,[value]: price})
                            })
                            contract.get_asset_balance({account_id: accountId, asset: value})
                            .then((balance) =>setAssetB({...assetB, [value]: balance}))
                          }
                    }}>
                    {assetItems}
                </Form.Control>
            </Form.Group>
       </Col>
    </Row>
    <Accordion>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    BUY
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Form
                        onSubmit={buyAssetWithAusd} 
                        style={{width: '100%'}}>
                        <Form.Group controlId="buyAsset">
                            <Form.Label>BUY {currentAsset}: </Form.Label>
                            <InputGroup className="mb-2" >
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{currentAsset}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    value={buyAmount.asset}
                                    onChange={(event) => {
                                        if (event) {
                                            const value = event.target !== null ? event.target.value : "";
                                            setBuyAmount({asset: value, aUSD: Number(value)*Number(assetP[currentAsset])/10**8})
                                        }
                                    }} 
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="fromausd">
                            <Form.Label>with aUSD: </Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                <InputGroup.Text>aUSD</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                    value={buyAmount.aUSD}
                                    onChange={(event) => {
                                        if (event) {
                                            const value = event.target !== null ? event.target.value : "";
                                            setBuyAmount({asset: Number(value)/(Number(assetP[currentAsset])/10**8), aUSD: value})
                                        }
                                    }} 
                                />
                            </InputGroup>
                        </Form.Group>
                        
                        <Row style={{fontSize: "12px"}}>
                            <Col>Balace: {formatNearAmount(assetB[currentAsset],5)}</Col>
                            <Col>Price: 1 {currentAsset} = {(Number(assetP[currentAsset])/10**8).toFixed(4)} aUSD</Col>
                            <Col>USD VALUE: ${(Number(buyAmount.asset)*Number(assetP[currentAsset])/10**8).toFixed(4)}</Col>
                        </Row>

                        <Button variant="primary" type="submit">
                            CONFIRM TRADE
                        </Button>
                    </Form>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Card.Header} eventKey="1">
                SELL
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
            <Card.Body>
                <Form 
                    onSubmit={sellAssettoAusd}
                    style={{width: '100%'}}>
                    <Form.Group controlId="sellAsset">
                        <Form.Label>SELL {currentAsset}: </Form.Label>
                        <InputGroup className="mb-2" >
                            <InputGroup.Prepend>
                            <InputGroup.Text>{currentAsset}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                value={sellAmount.asset}
                                onChange={(event) => {
                                    if (event) {
                                        const value = event.target !== null ? event.target.value : "";
                                        setSellAmount({asset: value, aUSD: Number(value)*Number(assetP[currentAsset])/10**8})
                                    }
                                }} 
                                />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="toausd">
                        <Form.Label>to aUSD: </Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                            <InputGroup.Text>aUSD</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                value={sellAmount.aUSD}
                                onChange={(event) => {
                                    if (event) {
                                        const value = event.target !== null ? event.target.value : "";
                                        setSellAmount({asset: Number(value)/(Number(assetP[currentAsset])/10**8), aUSD: value})
                                    }
                                }} 
                            />
                        </InputGroup>
                    </Form.Group>
                    
                    <Row style={{fontSize: "12px"}}>
                        <Col>Balace: {formatNearAmount(assetB[currentAsset],5)}</Col>
                        <Col>Price: 1 {currentAsset} = {(Number(assetP[currentAsset])/10**8).toFixed(4)} aUSD</Col>
                        <Col>USD VALUE: ${(Number(sellAmount.asset)*Number(assetP[currentAsset])/10**8).toFixed(4)}</Col>
                    </Row>

                    <Button variant="primary" type="submit">
                        CONFIRM TRADE
                    </Button>
                </Form>
            </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
    </div>
}

export default TradeCard

