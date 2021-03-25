import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const Header = ({currentUser, signIn, signOut}) => {
    if (!currentUser) {
        return <div style={{width: '110%'}}>
            <Row>
                <Col>
                    <header>ART Coin Exchange</header>
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
    return <div>
        <Row noGutters>
            <Col>
                <header>ART Coin Exchange</header>
            </Col>
            <Col>
                <NavLink exact to="/">Home</NavLink>
            </Col>
            <Col>
                <NavLink exact to="/stake">Stake</NavLink>
            </Col>
            <Col>
                <NavLink exact to="/trade">Trade</NavLink>
            </Col>
            <Col>
                <NavLink exact to="/questions">FAQs</NavLink>
            </Col>
            <Col>
                <NavLink exact to="/docs">DOCs</NavLink>
            </Col>
            <Col onClick={signOut}>
                Sign Out
            </Col>
        </Row>
    </div>
}

export default Header