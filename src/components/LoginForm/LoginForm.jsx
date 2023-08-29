import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Nav, Container, Row, Col } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const LoginForm = ({ fireSignupActions, setShowLoginModal }) => {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const { authenticateUser, storeToken } = useContext(AuthContext)

	const handleInputChange = e => {
		const { value, name } = e.target
		setLoginData({ ...loginData, [name]: value })
	}

	const handleSubmit = e => {
		e.preventDefault()

		authService
			.login(loginData)
			.then(({ data }) => {
				storeToken(data.authToken)
				authenticateUser()
				setShowLoginModal(false)
				navigate('/challenges')
			})
			.catch(err => console.log(err))
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3' controlId='email'>
				<Form.Label>E-mail</Form.Label>
				<Form.Control
					type='email'
					value={loginData.email}
					onChange={handleInputChange}
					name='email'
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='password'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					value={loginData.password}
					onChange={handleInputChange}
					name='password'
				/>
			</Form.Group>

			<div className='d-grid mb-3'>
				<Button variant='primary' type='submit'>
					Login
				</Button>
			</div>

			<Container>
				<Row>
					<Col>
						<div>Don't have an account yet?</div>
					</Col>
					<Col>
						<Link className='nav-link' onClick={fireSignupActions}>
							Sign up
						</Link>
					</Col>
				</Row>
			</Container>
		</Form>
	)
}

export default LoginForm
