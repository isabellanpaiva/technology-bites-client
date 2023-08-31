import { useContext, useState } from 'react'
import { Navbar, Nav, Container, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {
	const { loggedUser, logout } = useContext(AuthContext)

	const loggedUser_id = loggedUser ? loggedUser._id : ''

	const [modalData, setModalData] = useState({
		show: false,
		content: '',
	})

	const navigate = useNavigate()

	const logoutUser = () => {
		logout()
		navigate('/')
	}

	return (
		<>
			<Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
				<Container>

					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='me-auto'>
							<Link to={'/'} className='nav-link'>
								Home
							</Link>
							<Link to={'/challenges'} className='nav-link'>
								Challenges
							</Link>
							<Link to={'/dojo'} className='nav-link'>
								Dojo
							</Link>
							<Link to={'/community'} className='nav-link'>
								Community
							</Link>

							{/* login button  */}

							{!loggedUser && (
								<Nav.Link
									className='nav-link'
									onClick={() =>
										setModalData({ show: true, content: 'loginModal' })
									}>
									Login
								</Nav.Link>
							)}

							{/* logout button  */}

							{loggedUser && (
								<>
									<Link to={`/profile/${loggedUser_id}`} className='nav-link'>
										My profile
									</Link>

									<span className='nav-link' onClick={logoutUser}>
										Logout
									</span>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Modal show={modalData.show} onHide={() => setModalData({ ...modalData, show: false })}>
				<Modal.Header closeButton>
					<Modal.Title>
						{modalData.content === 'loginModal' ? 'Login' : 'Signup'}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					{modalData.content === 'loginModal' && (
						<LoginForm setModalData={setModalData} />
					)}
					{modalData.content === 'signupModal' && (
						<SignupForm setModalData={setModalData} />
					)}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Navigation
