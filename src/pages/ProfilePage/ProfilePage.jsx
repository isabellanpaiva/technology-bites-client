import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import userService from '../../services/user.services'
import challengeServices from '../../services/challenge.services'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import CommentCard from '../../components/CommentCard/CommentCard'

const ProfilePage = () => {
	const { user_id } = useParams()
	const navigate = useNavigate()

	const { logout } = useContext(AuthContext)
	const [user, setUser] = useState({})
	const [showProfileEditModal, setProfileEditModal] = useState(false)
	const [userRsponses, setUserResponses] = useState(null)

	const { firstName, lastName, avatar, email, jobPosition, description } = user

	useEffect(() => {
		loadUserDetails()
		loadUserResponses()
	}, [])

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
		// userService
		// 	.getCompletedChallenges(user_id)
		// 	.then(response => console.log(response))
		// 	.catch(err => console.log(err))
		// setMyResponse(challenge?.responses?.filter(response => response.user === loggedUser._id))
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
							{' '}
							{firstName} {lastName}{' '}
						</p>
						<p> {email} </p>
						<p> {jobPosition} </p>
						<p> {description}</p>
						<Button onClick={() => setProfileEditModal(true)}> Edit profile </Button>
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

						{/* {challenge?.responses?.map(response => {
							return (
								<Col key={response._id} md={{ span: 4 }}>
									<ResponseCard
										response={response}
										challenge={challenge}></ResponseCard>
								</Col>
							)
						})} */}
					</Col>
				</Row>

				<Row>
					<CommentCard />
				</Row>
			</section>

			<section>
				<Row>
					<Col md={{ span: 8, offset: 2 }}>
						<h5> Danger zone </h5>

						<Button variant='danger' onClick={deleteProfile}>
							{' '}
							Delete profile{' '}
						</Button>
					</Col>
				</Row>
			</section>
		</Container>
	)
}

export default ProfilePage
