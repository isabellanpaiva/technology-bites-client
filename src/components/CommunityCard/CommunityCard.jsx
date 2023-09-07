import { Card, Row, Col, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'
import ProfileEditForm from '../ProfileEditForm/ProfileEditForm'

const CommunityCard = ({ user, profilePage, loadUserDetails, loadCommunityDetails }) => {
	const { loggedUser } = useContext(AuthContext)

	const [errors, setErrors] = useState([])
	const [following, setFollowing] = useState(false)
	const [showProfileEditModal, setProfileEditModal] = useState(false)
	const navigate = useNavigate()

	const { _id: user_id, firstName, lastName, avatar, description, jobPosition } = user

	useEffect(() => {
		setFollowing(user.followers.includes(loggedUser._id))
	}, [])

	const saveUserEdition = () => {
		loadUserDetails()
		setProfileEditModal(false)
	}

	const handleFollow = (friend_id, { action }) => {
		userService
			.updateFollowers(friend_id, action)
			.then(() => {
				setFollowing(!following)
				profilePage ? loadUserDetails() : loadCommunityDetails()
			})
			.catch(err => setErrors(err.response))
	}

	const checkUserProfile = () => {
		navigate(`/profile/${user._id}`)
	}

	return (
		<>
			<Card className='CommunityCard'>
				<Card.Header className='CardHeader'>
					<Row>
						<Col>
							<img src={avatar} className='userAvatar mb-' alt='ProfileAvatar' />

							<Card.Title className='CardTitle'>
								<div>{firstName} {lastName}</div>
								<div style={{ fontSize: '0.75em', marginTop: '1em' }}>{jobPosition}</div>
								<div style={{ fontSize: '0.5em', marginTop: '1.5em', color: 'lightgray' }}>
									{user.followers.length}{' '}
									{user.followers.length === 1 ? 'follower' : 'followers'}

								</div>
							</Card.Title>

						</Col>
					</Row>

				</Card.Header>

				<Card.Body className='CardBody mb-3'>

					<Card.Text className='CardText'>
						{description}
					</Card.Text>

				</Card.Body>

				<Card.Footer className='CardFooter'>

					{/* <Row>
						<div style={{ fontSize: '1.25em', marginBottom: '1.5em' }}>
							<strong>{user.followers.length}{' '}
								{user.followers.length === 1 ? 'follower' : 'followers'}
							</strong>
						</div>
					</Row> */}

					<Row>
						{!profilePage && (
							<Col>
								<button className='socialActionButton' onClick={checkUserProfile}>
									See profile
								</button>
							</Col>
						)}
						{user._id !== loggedUser._id && (
							<Col>
								<button
									className='socialActionButton'
									onClick={
										!following
											? () => handleFollow(user_id, { action: 'add' })
											: () => handleFollow(user_id, { action: 'remove' })
									}>
									{following ? 'Unfollow' : 'Follow'}
								</button>
							</Col>
						)}
					</Row>
					<Row>
						<Col>
							{user._id === loggedUser._id && (
								<Button
									className='callToAction'
									onClick={() => setProfileEditModal(true)}>
									Edit profile
								</Button>
							)}
						</Col>
					</Row>
				</Card.Footer>
			</Card>
			<Modal show={showProfileEditModal} onHide={() => setProfileEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit personal information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ProfileEditForm saveUserEdition={saveUserEdition} />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default CommunityCard
