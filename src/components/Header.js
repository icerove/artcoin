import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const Header = ({currentUser, signOut}) => {
    if (!currentUser) {
        return <div style={{textAlign: 'center'}}>
                ARTIFICIAL EXCHANGE
        </div>
    }
    return (
        <Row noGutters className='mb-5'>
            <Col>
                <NavLink exact to="/" className="head-item"><p>ARTIFICIAL EXCHANGE</p></NavLink>
            </Col>
            <Col className="p-2">
                <NavLink exact to="/markets" className="head-item">Markets</NavLink>
            </Col>
            <Col className="p-2">
                <NavLink exact to="/wallet" className="head-item">Wallet</NavLink>
            </Col>
            <Col className="p-2">
                <NavLink exact to="/trade" className="head-item">Trade</NavLink>
            </Col>
            <Col className="p-2">
                <NavLink exact to="/stake" className="head-item">Stake</NavLink>
            </Col>
            <Col className="p-2">
                <NavLink exact to="/faqs" className="head-item">FAQs</NavLink>
            </Col>
            <Col className="p-2">
                <NavLink exact to="/docs" className="head-item">DOCs</NavLink>
            </Col>
            <Col onClick={signOut} className="p-2">
                <button onClick={signOut}>Sign Out</button>
            </Col>
        </Row>)
}

export default Header