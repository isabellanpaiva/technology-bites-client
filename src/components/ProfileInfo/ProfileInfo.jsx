import { useEffect, useState } from "react"
import userService from '../../services/user.services'
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'

const ProfileInfo = () => {

    const [showProfileEditModal, setProfileEditModal] = useState(false)

    const { user_id } = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        loadUserDetails()
    }, [])

    const loadUserDetails = () => {

        userService
            .getOneUser(user_id)
            .then(({ data }) => setUser(data))
            .catch(err => console.log(err))
    }

    const navigate = useNavigate()

    const fireDeleteProfile = () => {

        userService
            .deleteUser(user_id)
            .then(() => {
                alert("Profile deleted")
                navigate('/profile')
            })
            .catch(err => console.log(err))

    }

    return (

        <Container className="ProfileInfo">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>


                    {/* if user or admin: */}

                    <h3>Welcome, {user.firstName}</h3>

                    {/* if user or admin: */}


                    {/* add avatar */}

                    <br></br>

                    <p> {user.firstName} {user.lastName} </p>

                    <p> {user.email} </p>

                    <p> {user.jobPosition} </p>

                    <p> {user.description}</p>


                    {/* if owner or admin: */}

                    <Button onClick={() => setProfileEditModal(true)}> Edit profile </Button>

                    <br></br>

                    {/* if owner or admin: */}


                    {/* rest of the things to be shown... */}


                    {/* if user or admin: */}

                    <br></br> <br></br>

                    <h5> Danger zone </h5>

                    <br></br>

                    <Button variant="danger" onClick={fireDeleteProfile}> Delete profile </Button>

                    {/* <form action="/users/delete/{{user.id}}" method="POST">
                        <input class="btn btn-danger" type="submit" role="button" value="Delete profile">
                    </form> */}

                    {/* if user or admin: */}



                    {/* modals */}

                    <Modal show={showProfileEditModal} onHide={() => setProfileEditModal(false)}>

                        <Modal.Header closeButton>
                            <Modal.Title>Edit personal information</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ProfileEditForm setProfileEditModal={setProfileEditModal} />
                        </Modal.Body>

                    </Modal>


                </Col>

            </Row>

        </Container >
    )
}

export default ProfileInfo