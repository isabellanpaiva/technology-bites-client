import { Card, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import userService from '../../services/user.services'

const CommunityCard = ({ user }) => {
	const { loggedUser } = useContext(AuthContext)

	const [following, setFollowing] = useState(false)
	const [followersCount, setFollowersCount] = useState(0)
	const [errors, setErrors] = useState([])
	const navigate = useNavigate()

	const { _id: user_id, firstName, lastName, avatar, description, jobPosition } = user

	useEffect(() => {
		setFollowing(user.followers.includes(loggedUser._id))
		setFollowersCount(user.followers.length)
	}, [])

	const handleFollow = (friend_id, { action }) => {
		userService
			.updateFollowers(friend_id, action)
			.then(() => setFollowing(!following))
			.catch(err => setErrors(err.response.data.errorMessages))

		setFollowersCount(followersCount + (action === 'add' ? +1 : -1))
		setFollowing(!following)
	}

	const checkUserProfile = () => {
		navigate(`/profile/${user._id}`)
	}

	return (
		<Card className='CommunityCard'>
			<Card.Header className='CardHeader'>
				<Row>
					<Col>
						<img src={avatar} className='userAvatar mb-1' alt='ProfileAvatar' />

						<Card.Title className='CardTitle'>
							{firstName} {lastName}
						</Card.Title>
					</Col>
				</Row>
			</Card.Header>

			<Card.Body className='CardBody'>
				<Card.Text className='CardText'> {jobPosition} </Card.Text>

				<Card.Text className='plainText' style={{ fontSize: '1.3em' }}>
					{description}
				</Card.Text>
			</Card.Body>

			<Card.Footer className='CardFooter'>
				<Row>
					<Col>
						<button className='socialActionButton' onClick={checkUserProfile}>
							Check
						</button>
					</Col>
					<Col>
						<button
							className='socialActionButton'
							onClick={
								!following
									? () => handleFollow(user_id, { action: 'add' })
									: () => handleFollow(user_id, { action: 'remove' })
							}>
							{following ? 'Unfollow' : 'Follow'} {followersCount}
						</button>
					</Col>
				</Row>
			</Card.Footer>
		</Card>
	)
}

export default CommunityCard
