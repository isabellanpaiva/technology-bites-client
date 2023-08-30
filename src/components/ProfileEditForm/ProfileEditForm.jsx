import { useContext, useState, useEffect } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap"
import userService from "../../services/user.services"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from '../../contexts/auth.context'

const ProfileEditForm = () => {

    const loggedUser = useContext(AuthContext)

    const { user_id } = useParams()

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        jobPosition: '',
        description: '',

        // add password recovering? 

    })

    useEffect(() => {
        loadUserDetails()
    }, [])

    const loadUserDetails = () => {

        userService
            .getOneUser(user_id)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err))
    }

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        userService
            .editUser(user_id, userData)
            .then(() => {
                // setShowSignupModal(false)
                navigate(`/profile/${loggedUser._id}`)
            })
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleFormSubmit}>

            {/* <h5> Personal information</h5>

            <br></br> */}

            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First name *</Form.Label>
                        <Form.Control type="text" value={userData.firstName} onChange={handleInputChange} name="firstName" />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last name * </Form.Label>
                        <Form.Control type="text" value={userData.lastName} onChange={handleInputChange} name="lastName" />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail * </Form.Label>
                <Form.Control type="email" value={userData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="jobPosition">
                <Form.Label>Job position</Form.Label>
                <Form.Control type="text" value={userData.jobPosition} onChange={handleInputChange} name="jobPosition" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Tell us about yourself</Form.Label>
                <Form.Control type="text" value={userData.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <br></br>

            {/* <h5> Account setup</h5>

            <br></br> */}

            {/* <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password * </Form.Label>
                <Form.Control type="password" value={userData.password} onChange={handleInputChange} name="password" />
            </Form.Group> */}

            <div className="d-grid mb-3">
                <Button variant="primary" type="submit">Save updates</Button>
            </div>

        </Form >


    )
}

export default ProfileEditForm

