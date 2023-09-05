import { useContext, useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Card, Modal, Carousel } from 'react-bootstrap'
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'
import CarouselResponses from '../../components/CarouselResponses/CarouselResponses'

const ProfilePage = () => {
	const { user_id } = useParams()

	const { loggedUser, logout } = useContext(AuthContext)

	const [user, setUser] = useState(null)
	const [showProfileEditModal, setProfileEditModal] = useState(false)
	const [userResponses, setUserResponses] = useState([])
	const [errors, setErrors] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		user ? getResponses() : loadUserDetails()
	}, [user])

	const fireFinalActions = () => {
		loadUserDetails()
		setProfileEditModal(false)
	}

	const loadUserDetails = () => {
		userService
			.getOneUser(user_id)
			.then(({ data }) => {
				setUser(data)
				getResponses()
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const getResponses = () => {
		responseService
			.getUserResponses(user_id)
			.then(({ data }) => setUserResponses(data))
			.catch(err => setErrors(err.response.data.errorMessages))
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
				.catch(err => setErrors(err.response.data.errorMessages))
		}
	}

	return (
		<Container className='PageContainer'>
			{!user ? (
				<p> cargando.......</p>
			) : (
				<>
					<section style={{ marginBottom: '5em' }}>
						<h1 className='PageHeading' style={{ fontSize: '3em' }}>
							{user && user._id === loggedUser._id
								? `Welcome, ${user.firstName}!`
								: `${user.firstName} ${user.lastName} profile`}
						</h1>

						<h3 className='PageSubHeading'>
							{user && user._id === loggedUser._id
								? 'Nice to have you here'
								: 'Inspire and be inspired'}
						</h3>
					</section>

					<section className=' ProfileInformation mb-5'>
						<Card className='CommunityCard'>
							<Card.Header className='CardHeader'>
								<Row>
									<Col>
										<img
											src={user.avatar}
											alt='ProfileAvatar'
											className='mb-1'
										/>
									</Col>
								</Row>
							</Card.Header>

							<Card.Body className='CardBody'>
								<Card.Title className='CardTitle' style={{ marginBottom: '-1rem' }}>
									{user.firstName} {user.lastName}
								</Card.Title>

								<Card.Text className='CardText'> {user.jobPosition} </Card.Text>
								<Card.Text className='CardText' style={{ color: 'black' }}>
									{user.email}
								</Card.Text>
								<Card.Text className='CardText'> {user.description} </Card.Text>
							</Card.Body>

							<Card.Footer className='CardFooter'>
								<Row>
									<Col>
										{loggedUser && user._id === loggedUser._id ? (
											<Button
												className='callToAction'
												onClick={() => setProfileEditModal(true)}>
												Edit profile
											</Button>
										) : (
											<button className='socialActionButton'>Follow</button>
										)}
									</Col>
								</Row>
							</Card.Footer>
						</Card>

						<Modal
							show={showProfileEditModal}
							onHide={() => setProfileEditModal(false)}>
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
							<h1
								className='PageHeading'
								style={{
									fontSize: '3em',
									marginTop: '2em',
									marginBottom: '0.5em',
								}}>
								Library
							</h1>

							<h3 className='PageSubHeading'>
								{loggedUser && user._id === loggedUser._id
									? 'Your previous responses'
									: `Previous responses from ${user.firstName}`}
							</h3>
							{userResponses ? (
								userResponses.length > 0 ? (
									<CarouselResponses
										responses={userResponses}
										getResponses={getResponses}
										type={'profile'}
										data-bs-theme='dark'></CarouselResponses>
								) : (
									<h3 className='PageSubHeading mt-5' style={{ color: 'gray' }}>
										{loggedUser && user._id === loggedUser._id
											? 'No challenges resolved yet. What about start now?'
											: `Ops... ${user.firstName} don't have any responsers yet 🔎`}
									</h3>
								)
							) : (
								<p>Loading...</p>
							)}
						</Row>
					</section>

					<section>
						{loggedUser && user._id === loggedUser._id ? (
							<Row>
								<Col md={{ span: 8, offset: 2 }} className='text-center'>
									<h1
										className='PageHeading'
										style={{ fontSize: '3em', marginTop: '2em' }}>
										Danger zone
									</h1>

									<h3 className='PageSubHeading' style={{ color: 'red' }}>
										We don't want you to go, but we respect your decisions.
									</h3>

									<Button
										className='callToAction mt-5'
										variant='danger'
										onClick={deleteProfile}>
										Delete profile
									</Button>
								</Col>
							</Row>
						) : (
							<h3 className='PageSubHeading'></h3>
						)}
					</section>
				</>
			)}
		</Container>
	)
}
export default ProfilePage
