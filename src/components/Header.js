import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const Header = ({currentUser, signIn, signOut}) => {
    if (!currentUser) {
        return <div style={{width: '110%'}}>
            <Row>
                <Col>
                    <p>ARTIFICIAL EXCHANGE</p>
                </Col>
                <Col>
                    <NavLink exact to="/">Home</NavLink>
                </Col>
                <Col>
                    <button onClick={signIn}>
                        Sign In
                    </button>
                </Col>
            </Row>
        </div>
    }
    return (
        <Row noGutters className='mb-5'>
            <Col>
                <NavLink exact to="/" className="head-item"><p>ARTIFICIAL EXCHANGE</p></NavLink>
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