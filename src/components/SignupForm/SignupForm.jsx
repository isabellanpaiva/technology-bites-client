import { useState } from 'react'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({ setShowSignupModal }) => {
	const [signupData, setSignupData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		jobPosition: '',
		description: '',

		// in progress

		// linkedin: '',

		//or

		// socials: [
		//     {
		//         platform: 'LinkedIn',
		//         link: ''
		//     },
		//     {
		//         platform: 'Github',
		//         link: ''
		//     },
		//     {
		//         platform: 'Instagram',
		//         link: ''
		//     },
		//     {
		//         platform: 'Facebook',
		//         link: ''
		//     },
		//     {
		//         platform: 'X',
		//         link: ''
		//     },
		// ]
	})

	const [loadingImage, setLoadingImage] = useState(false)

	const navigate = useNavigate()

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
				setLoadingImage(true)
			})
			.catch(err => console.log(err))
	}

	const handleFormSubmit = e => {
		e.preventDefault()

		authService
			.signup(signupData)
			.then(() => {
				setShowSignupModal(false)
				navigate('/community')
			})
			.catch(err => console.log(err))
	}

	return (
		<Form onSubmit={handleFormSubmit}>
			<h5> Personal information</h5>
			<br></br>
			<Row>
				<Col>
					<Form.Group className='mb-3' controlId='firstName'>
						<Form.Label>First name *</Form.Label>
						<Form.Control
							type='text'
							value={signupData.firstName}
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
							value={signupData.lastName}
							onChange={handleInputChange}
							name='lastName'
						/>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group className='mb-3' controlId='email'>
				<Form.Label>E-mail * </Form.Label>
				<Form.Control
					type='email'
					value={signupData.email}
					onChange={handleInputChange}
					name='email'
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='jobPosition'>
				<Form.Label>Job position</Form.Label>
				<Form.Control
					type='text'
					value={signupData.jobPosition}
					onChange={handleInputChange}
					name='jobPosition'
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='description'>
				<Form.Label>Tell us about yourself</Form.Label>
				<Form.Control
					type='text'
					value={signupData.description}
					onChange={handleInputChange}
					name='description'
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='avatar'>
				<Form.Label>Avatar</Form.Label>
				<Form.Control type='file' onChange={handleFileUpload} />
			</Form.Group>
			<br></br>
			//TODO PARA ESTO A LO MEJOR PODEMOS USAR FormData
			{/* // social information */}
			{/* <h5> Social information</h5>

            <br></br>

            <InputGroup className="mb-3">
                <InputGroup.Text type="text" > Linkedin </InputGroup.Text>
                <Form.Control type="text" value={signupData.linkedin} onChange={handleInputChange} name="linkedin" />
            </InputGroup>

            <br></br> */}
			{/* // account setup */}
			<h5> Account setup</h5>
			<br></br>
			<Form.Group className='mb-3' controlId='password'>
				<Form.Label>Password * </Form.Label>
				<Form.Control
					type='password'
					value={signupData.password}
					onChange={handleInputChange}
					name='password'
				/>
			</Form.Group>
			<div className='d-grid mb-3'>
				<Button variant='primary' type='submit' disabled={loadingImage}>
					{loadingImage ? 'Loading image...' : 'Sign up'}
				</Button>
			</div>
		</Form>
	)
}

export default SignupForm
