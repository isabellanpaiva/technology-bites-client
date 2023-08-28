import { useState } from 'react'
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'

const Navigation = () => {

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    return (

        <>

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">

                <Container>

                    <Link className='navbar-brand'>Tech Bites</Link>

                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">

                            <Link to={'/'} className='nav-link'>Home</Link>
                            <Link to={'/challenges'} className='nav-link'>Challenges</Link>
                            <Link to={'/dojo'} className='nav-link'>Dojo</Link>
                            <Link to={'/community'} className='nav-link'>Community</Link>

                            <Nav.Link className='nav-link' onClick={toggleModal}>Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>

            </Navbar>

            <Modal show={showModal} onHide={toggleModal}>

                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <LoginForm />
                    {/* pass togleModal to LoginForm  */}
                </Modal.Body>

                <Modal.Footer>
                </Modal.Footer>

            </Modal>

            {/* add new modal for sign up form  */}

        </>

    )
}

export default Navigation