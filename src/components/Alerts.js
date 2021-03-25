import React from 'react'
import {Alert} from 'react-bootstrap'

const AlertBanner = ({error, setAlert, setError}) => (
    <Alert  
        variant={'danger'} 
        onClose={() => {
            setAlert(false)
            setError('')
        }} 
        dismissible
    >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
            Error: {error}. Try again later
        </p>
    </Alert>
)

export default AlertBanner