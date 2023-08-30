import { useContext, useEffect, useState } from "react"
import userService from '../../services/user.services'
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import { AuthContext } from "../../contexts/auth.context"

const ProfilePage = () => {

    const { logout } = useContext(AuthContext)

    const [showProfileEditModal, setProfileEditModal] = useState(false)

    const { user_id } = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        loadUserDetails()
    }, [])

    const fireFinalActions = () => {
        loadUserDetails()
        setProfileEditModal(false)
    }

    const loadUserDetails = () => {

        userService
            .getOneUser(user_id)
            .then(({ data }) => setUser(data))
            .catch(err => console.log(err))
    }

    const navigate = useNavigate()

    const deleteProfile = () => {

        const shouldDelete = confirm("Are you sure you want to delete your profile? This action cannot be undone.")

        if (shouldDelete) {

            userService
                .deleteUser(user_id)
                .then(() => {
                    alert("Profile deleted")
                    logout()
                    navigate('/')
                })
                .catch(err => console.log(err))

        }
    }

    return (

        <Container className="ProfilePage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h3>Welcome, {user.firstName}</h3>

                    <div className="d-flex avatar-container">
                        <img
                            src={user.avatar}
                            alt="User avatar"
                            className="avatar-img"
                        />
                    </div>

                    <p> {user.firstName} {user.lastName} </p>

                    <p> {user.email} </p>

                    <p> {user.jobPosition} </p>

                    <p> {user.description}</p>

                    <Button onClick={() => setProfileEditModal(true)}> Edit profile </Button>

                    <h5> Danger zone </h5>

                    <Button variant="danger" onClick={deleteProfile} > Delete profile </Button>

                    <Modal show={showProfileEditModal} onHide={() => setProfileEditModal(false)}>

                        <Modal.Header closeButton>
                            <Modal.Title>Edit personal information</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ProfileEditForm fireFinalActions={fireFinalActions} />
                        </Modal.Body>

                    </Modal>

                </Col>

            </Row>

        </Container>
    )
}

export default ProfilePage