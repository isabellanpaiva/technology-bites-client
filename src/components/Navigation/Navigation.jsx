import './Navigation.css'
import './../../App.css'
import { useContext, useState } from 'react'
import { Navbar, Nav, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from '../../contexts/message.context'
import logo from './../../../public/logo.png'

const Navigation = () => {
	const { emitMessage } = useContext(MessageContext)
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
		emitMessage('See you soon!')
	}

	return (
		<>
			<Navbar expand='lg' fixed='top' className='Navigation'>
				<Nav>
					<Link to={'/'} className='nav-link'>
						<img
							src={logo}
							alt='logo'
							style={{ width: '5em', height: 'auto', filter: 'invert(100%)' }}
						/>
					</Link>
				</Nav>
				<Navbar.Toggle
					aria-controls='responsive-navbar-nav'
					style={{ marginRight: '5vw' }}
				/>
				<Navbar.Collapse>
					<Nav className='AuthLinks'>
						<Link to={'/'} className='nav-link'>
							Bites
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
					</Nav>

					<Nav className='AuthLinks'>
						{!loggedUser && (
							<Nav.Link
								className='nav-link'
								onClick={() => setModalData({ show: true, content: 'loginModal' })}>
								Login
							</Nav.Link>
						)}

						{loggedUser && (
							<>
								<Link to={`/profile/${loggedUser_id}`} className='nav-link'>
									My profile
								</Link>

								<span
									className='nav-link'
									onClick={logoutUser}
									style={{ cursor: 'pointer' }}>
									Logout
								</span>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
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
