import { useState } from 'react'
import { Navbar, Nav, Container, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'

const Navigation = () => {

    const [showLoginModal, setShowLoginModal] = useState(false)

    const [showSignupModal, setShowSignupModal] = useState(false)

    const fireSignupActions = () => {
        setShowLoginModal(false)
        setShowSignupModal(true)
    }

    return (

        <>

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">

                <Container>

                    <Link className='navbar-brand'>Tech Bites</Link>

                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">

                            <Link to={'/'} className='nav-link'>Home</Link>
                            <Link to={'/challenges'} className='nav-link'>Challenges</Link>
                            <Link to={'/dojo'} className='nav-link'>Dojo</Link>
                            <Link to={'/community'} className='nav-link'>Community</Link>

                            <Nav.Link className='nav-link' onClick={() => setShowLoginModal(true)}>Login</Nav.Link>

                            <Link to={`/profile/:user_id`} className='nav-link'>My profile</Link>

                        </Nav>
                    </Navbar.Collapse>

                </Container>

            </Navbar>

            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <LoginForm fireSignupActions={fireSignupActions} setShowLoginModal={setShowLoginModal} />
                </Modal.Body>


            </Modal>

            {/* add new modal for sign up form  */}

            <Modal show={showSignupModal} onHide={() => setShowSignupModal(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <SignupForm setShowSignupModal={setShowSignupModal} />
                </Modal.Body>

            </Modal>



        </>

    )
}

export default Navigation