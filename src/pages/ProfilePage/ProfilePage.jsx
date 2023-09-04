import { useContext, useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import { AuthContext } from '../../contexts/auth.context'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import responseService from '../../services/response.services'

const ProfilePage = () => {
	const { user_id } = useParams()

	const { logout } = useContext(AuthContext)
	const [user, setUser] = useState({})
	const [showProfileEditModal, setProfileEditModal] = useState(false)
	const [userResponses, setUserResponses] = useState([])

	const navigate = useNavigate()

	const { firstName, lastName, avatar, email, jobPosition, description } = user

	useEffect(() => {
		loadUserDetails()
		loadUserResponses()
	}, [user])

	const fireFinalActions = () => {
		loadUserDetails()
		setProfileEditModal(false)
	}

	const loadUserDetails = () => {
		userService
			.getOneUser(user_id)
			.then(({ data }) => setUser(data))
			.catch(err => console.log(err))
	}

	const loadUserResponses = () => {
		responseService
			.getUserResponses(user_id)
			.then(({ data }) => setUserResponses(data))
			.catch(err => console.log(err))
	}

	const deleteProfile = () => {
		const shouldDelete = confirm(
			'Are you sure you want to delete your profile? This action cannot be undone.'
		)
		if (shouldDelete) {
			userService
				.deleteUser(user_id)
				.then(() => {
					alert('Profile deleted')
					logout()
					navigate('/')
				})
				.catch(err => console.log(err))
		}
	}

	return (
		<Container className='ProfilePage'>
			<section className=' ProfileInformation mb-5'>
				<Row>
					<Col md={{ span: 8, offset: 2 }}>
						<h3>Welcome, {firstName}</h3>
						<div className='d-flex avatar-container'>
							<img src={avatar} alt='User avatar' className='avatar-img' />
						</div>
						<p>
							{firstName} {lastName}
						</p>
						<p> {email} </p>
						<p> {jobPosition} </p>
						<p> {description}</p>
						<Button className='callToAction' onClick={() => setProfileEditModal(true)}>
							Edit profile
						</Button>
					</Col>
				</Row>
				<Modal show={showProfileEditModal} onHide={() => setProfileEditModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit personal information</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ProfileEditForm fireFinalActions={fireFinalActions} />
					</Modal.Body>
				</Modal>
			</section>
			<section className=' ProfileCards mt-5'>
				<Row>
					<Col md={{ span: 8, offset: 2 }}>
						<h3>Your library</h3>
						{userResponses ? (
							userResponses.map(userResponse => {
								return (
									<ResponseCard
										key={userResponse._id}
										response={userResponse}
										challenge={userResponse.relatedChallenge}
									/>
								)
							})
						) : (
							<p>Loading...</p>
						)}
					</Col>
				</Row>
			</section>
			<section>
				<Row>
					<Col md={{ span: 8, offset: 2 }}>
						<h5> Danger zone </h5>
						<Button className='callToAction' variant='danger' onClick={deleteProfile}>
							Delete profile
						</Button>
					</Col>
				</Row>
			</section>
		</Container>
	)
}
export default ProfilePage
