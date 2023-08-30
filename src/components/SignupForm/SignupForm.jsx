import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"

const SignupForm = ({ setShowSignupModal }) => {

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        jobPosition: '',
        description: '',

        // add cloudinary avatar 

    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                setShowSignupModal(false)
                navigate('/community')
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleFormSubmit}>

            <h5> Personal information</h5>

            <br></br>

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First name *</Form.Label>
                        <Form.Control type="text" value={signupData.firstName} onChange={handleInputChange} name="firstName" />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last name * </Form.Label>
                        <Form.Control type="text" value={signupData.lastName} onChange={handleInputChange} name="lastName" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail * </Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="jobPosition">
                <Form.Label>Job position</Form.Label>
                <Form.Control type="text" value={signupData.jobPosition} onChange={handleInputChange} name="jobPosition" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Tell us about yourself</Form.Label>
                <Form.Control type="text" value={signupData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <br></br>

            {/* // account setup */}

            <h5> Account setup</h5>

            <br></br>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password * </Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <div className="d-grid mb-3">
                <Button variant="primary" type="submit">Sign up</Button>
            </div>

        </Form >
    )
}

export default SignupForm