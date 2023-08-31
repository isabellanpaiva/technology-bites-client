import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import FormError from '../FormError/FormError'

const LoginForm = ({ setModalData }) => {
	const { authenticateUser, storeToken } = useContext(AuthContext)
	const navigate = useNavigate()
	const [errors, setErrors] = useState([])

	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = loginData

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
				setModalData({ show: false, content: 'loginModal' })
				navigate('/challenges')
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3' controlId='email'>
				<Form.Label>E-mail</Form.Label>
				<Form.Control
					type='email'
					value={email}
					onChange={handleInputChange}
					name='email'
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='password'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					value={password}
					onChange={handleInputChange}
					name='password'
				/>
			</Form.Group>

			{errors.length > 0 &&
				errors.map(elm => (
					<FormError>
						<p key={elm} style={{ margin: 0 }}>
							{elm}
						</p>
					</FormError>
				))}

			{/* login  */}

			<div className='d-grid mb-3'>
				<Button variant='primary' type='submit'>
					Login
				</Button>
			</div>

			{/* signup  */}

			<Container>
				<Row>
					<Col>
						<div>Don't have an account yet?</div>
					</Col>

					<Col>
						<Link
							className='nav-link'
							onClick={() => setModalData({ show: true, content: 'signupModal' })}>
							Sign up
						</Link>
					</Col>
				</Row>
			</Container>
		</Form>
	)
}

export default LoginForm
