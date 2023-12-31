import { useContext, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'
import uploadServices from '../../services/upload.services'
import FormError from '../FormError/FormError'
import Spinner from 'react-bootstrap/Spinner'
import { MessageContext } from '../../contexts/message.context'

const SignupForm = ({ setModalData }) => {
	const { emitMessage } = useContext(MessageContext)

	const [errors, setErrors] = useState([])
	const [loadingImage, setLoadingImage] = useState(false)
	const navigate = useNavigate()

	const [signupData, setSignupData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		jobPosition: '',
		description: '',
		avatar: null,
	})

	const { firstName, lastName, email, password, jobPosition, description } = signupData

	const handleInputChange = e => {
		const { value, name } = e.target
		setSignupData({ ...signupData, [name]: value })
	}

	const handleFileUpload = e => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append('imageData', e.target.files[0])
		uploadServices
			.uploadimage(formData)
			.then(res => {
				setSignupData({ ...signupData, avatar: res.data.cloudinary_url })
				setLoadingImage(false)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const handleFormSubmit = e => {
		e.preventDefault()

		authService
			.signup(signupData)
			.then(() => {
				setModalData({ show: false, content: 'signupModal' })
				navigate('/')
				emitMessage(`Nice! You're now officially a biter`)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<Form onSubmit={handleFormSubmit}>
			<Row>
				<Col>
					<Form.Group className='mb-3' controlId='firstName'>
						<Form.Label>First name *</Form.Label>
						<Form.Control
							type='text'
							value={firstName}
							onChange={handleInputChange}
							name='firstName'
						/>
					</Form.Group>
				</Col>

				<Col>
					<Form.Group className='mb-3' controlId='lastName'>
						<Form.Label>Last name * </Form.Label>
						<Form.Control
							type='text'
							value={lastName}
							onChange={handleInputChange}
							name='lastName'
						/>
					</Form.Group>
				</Col>
			</Row>

			<Row>
				<Col>
					<Form.Group className='mb-3' controlId='email'>
						<Form.Label>E-mail * </Form.Label>
						<Form.Control
							type='email'
							value={email}
							onChange={handleInputChange}
							name='email'
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className='mb-3' controlId='password'>
						<Form.Label>Password * </Form.Label>
						<Form.Control
							type='password'
							value={password}
							onChange={handleInputChange}
							name='password'
						/>
					</Form.Group>
				</Col>
			</Row>

			<Form.Group className='mb-3' controlId='jobPosition'>
				<Form.Label>Job position</Form.Label>
				<Form.Control
					type='text'
					value={jobPosition}
					onChange={handleInputChange}
					name='jobPosition'
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='description'>
				<Form.Label>Tell us about yourself</Form.Label>
				<Form.Control
					type='text'
					value={description}
					onChange={handleInputChange}
					name='description'
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='avatar'>
				<Form.Label>Avatar</Form.Label>
				<Form.Control type='file' onChange={handleFileUpload} />
			</Form.Group>

			<div className='d-grid mb-3'>
				<Button className="callToAction" variant='primary' type='submit' disabled={loadingImage}>
					{loadingImage ? (
						<Spinner animation='border' size='sm' role='status' />
					) : (
						'Sign up'
					)}
				</Button>
			</div>

			{errors.length > 0 && (
				<FormError>
					{errors.map(elm => (
						<p key={elm} style={{ margin: 0, fontSize: '.8em' }}>
							{elm}
						</p>
					))}
				</FormError>
			)}
		</Form>
	)
}

export default SignupForm
