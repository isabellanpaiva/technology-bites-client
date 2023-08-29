import { useState } from "react"
import { Link } from 'react-router-dom'
import { Form, Button, Nav, Container, Row, Col } from "react-bootstrap"

// import login services goes here


const LoginForm = ({ fireSignupActions }) => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        // login services goes here

    }

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid mb-3">
                <Button variant="primary" type="submit">Login</Button>
            </div>

            <Container>
                <Row>
                    <Col>
                        <div>Don't have an account yet?</div>
                    </Col>
                    <Col>
                        <Link className='nav-link' onClick={fireSignupActions}> Sign up</Link>
                    </Col>
                </Row>
            </Container>

        </Form >
    )
}

export default LoginForm