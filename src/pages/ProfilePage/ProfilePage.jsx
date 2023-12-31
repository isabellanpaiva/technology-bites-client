import { useContext, useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'
import CarouselResponses from '../../components/CarouselResponses/CarouselResponses'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import * as MESSAGES from './../../consts/messages.consts'

const ProfilePage = name => {
	const { user_id } = useParams()
	const { loggedUser, logout } = useContext(AuthContext)

	const [user, setUser] = useState(null)
	const [userResponses, setUserResponses] = useState([])
	const [errors, setErrors] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		user ? getResponses() : loadUserDetails()
	}, [user])

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
		const shouldDelete = confirm(MESSAGES.PROMPT_DELETE_PROFILE)
		if (shouldDelete) {
			userService
				.deleteUser(user_id)
				.then(() => {
					alert(MESSAGES.CONFIRM_PROFILE_DELETE)
					logout()
					navigate('/')
				})
				.catch(err => setErrors(err.response.data.errorMessages))
		}
	}

	return (
		<Container fluid>
			{!user ? (
				<Container fluid className='full-spinner'>
					<Spinner animation='border' size='sm' role='status' />
				</Container>
			) : (
				<>
					<section className='section-header'>
						<h1 className='PageHeading'>
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
					<Row className='justify-content-center'>
						<Col sm={{ span: 10 }}>
							<CommunityCard
								user={user}
								profilePage={true}
								loadUserDetails={loadUserDetails}
							/>
						</Col>
					</Row>

					<section className='ProfileCards mt-5'>
						<Row className='justify-content-center'>
							<h1 className='PageHeading mb-3'>Library</h1>
							<h3 className='PageSubHeading'>
								{user._id === loggedUser._id
									? 'Your previous responses'
									: `Previous responses from ${user.firstName}`}
							</h3>
							<Col lg={{ span: 9 }} md={{ span: 10 }}>
								{userResponses ? (
									userResponses.length > 0 ? (
										<CarouselResponses
											responses={userResponses}
											getResponses={getResponses}
											type={'profile'}
											data-bs-theme='dark'></CarouselResponses>
									) : (
										<h4
											className='PageSubHeading mt-5'
											style={{ color: 'gray' }}>
											{user._id === loggedUser._id
												? 'No challenges resolved yet. What about start now?'
												: `Ops... ${user.firstName} don't have any responsers yet 🔎`}
										</h4>
									)
								) : (
									<Container fluid className='full-spinner'>
										<Spinner animation='border' size='sm' role='status' />
									</Container>
								)}
							</Col>
						</Row>
					</section>

					<section>
						{user._id === loggedUser._id ? (
							<Row>
								<Col md={{ span: 8, offset: 2 }} className='text-center'>
									<h1
										className='PageHeading'
										style={{ fontSize: '3em', marginTop: '2em' }}>
										Danger zone
									</h1>

									<h3 className='PageSubHeading'>
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
