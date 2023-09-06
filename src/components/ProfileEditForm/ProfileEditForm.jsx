import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import userService from '../../services/user.services'
import { useParams } from 'react-router-dom'
import uploadServices from '../../services/upload.services'

const ProfileEditForm = ({ saveUserEdition }) => {
	const { user_id } = useParams()

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		jobPosition: '',
		description: '',
		avatar: '',
	})

	const { firstName, lastName, email, password, jobPosition, description, avatar } = userData

	const [loadingImage, setLoadingImage] = useState(false)

	useEffect(() => {
		loadUserDetails()
	}, [])

	const loadUserDetails = () => {
		userService
			.getOneUser(user_id)
			.then(({ data }) => setUserData(data))
			.catch(err => console.log(err))
	}

	const handleInputChange = e => {
		const { value, name } = e.target
		setUserData({ ...userData, [name]: value })
	}

	const handleFileUpload = e => {
		setLoadingImage(true)

		const formData = new FormData()
		formData.append('imageData', e.target.files[0])

		uploadServices
			.uploadimage(formData)
			.then(res => {
				setUserData({ ...userData, avatar: res.data.cloudinary_url })
				setLoadingImage(false)
			})
			.catch(err => console.log(err))
	}

	const handleFormSubmit = e => {
		e.preventDefault()

		userService
			.editUser(user_id, userData)
			.then(() => {
				saveUserEdition()
			})
			.catch(err => console.log(err))
	}

	return (
		<Form onSubmit={handleFormSubmit}>
			<Row>
				<div className='d-flex avatar-container'>
					<img className='userAvatar' src={avatar} alt='User avatar' />
				</div>

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

			<Form.Group className='mb-3' controlId='email'>
				<Form.Label>E-mail * </Form.Label>
				<Form.Control
					type='email'
					value={email}
					onChange={handleInputChange}
					name='email'
				/>
			</Form.Group>

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
				<Button
					className='callToAction'
					variant='primary'
					type='submit'
					disabled={loadingImage}>
					{loadingImage ? 'Loading image...' : 'Save updates'}
				</Button>
			</div>
		</Form>
	)
}

export default ProfileEditForm
