import { useEffect, useState } from "react"
import userService from '../../services/user.services'
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

const ProfileInfo = () => {

    const [showEditProfileModal, setEditProfileModal] = useState(false)

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

    return (

        <Container className="ProfileInfo">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>


                    {/* if user or admin: */}

                    <h3>Welcome, {user.firstName}</h3>

                    {/* if user or admin: */}


                    {/* add avatar */}

                    <br></br>

                    <p> -- {user.firstName} {user.lastName} </p>

                    <p> -- {user.email} </p>

                    <p> -- {user.jobPosition} </p>

                    <p> -- {user.description}</p>


                    {/* if owner or admin: */}

                    <Button onClick={() => setEditProfileModal(true)}> Edit profile </Button>

                    <br></br>

                    {/* if owner or admin: */}


                    {/* rest of the things to be shown... */}


                    {/* if user or admin: */}

                    <br></br>

                    <h5> Danger zone </h5>

                    <br></br>

                    <Button variant="danger"> Delete profile </Button>

                    {/* if user or admin: */}



                    {/* modals */}

                    <Modal show={showEditProfileModal} onHide={() => setEditProfileModal(false)}>

                        <Modal.Header closeButton>
                            <Modal.Title>Edit profile</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {/* <SignupForm setShowSignupModal={setShowSignupModal} /> */}
                        </Modal.Body>

                    </Modal>


                </Col>

            </Row>

        </Container >
    )
}

export default ProfileInfo