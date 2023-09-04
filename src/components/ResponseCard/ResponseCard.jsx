import { Card, Row, Col, Accordion } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'
import CommentCardNested from '../CommentCard/CommentCard-nested'
import { useContext, useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'

const ResponseCard = ({ challenge, response, type }) => {
	const { loggedUser } = useContext(AuthContext)

	const [responseOwner, setResponseOwner] = useState(null)
	const [showComments, setShowComments] = useState(false)
	const [isFav, setFav] = useState(false)
	const [favCount, setFavCount] = useState(0)

	useEffect(() => {
		userService
			.getOneUser(response.user)
			.then(({ data }) => setResponseOwner(data))
			.catch(err => console.log(err))
		checkFavs(response)
		setFavCount(response.likes.length)
	}, [])

	const checkFavs = response => {
		setFav(response.likes.includes(loggedUser._id))
	}

	const handleFav = (response_id, { action }) => {
		responseService
			.handleResponseFav(response_id, loggedUser._id, action)
			.then(() => setFav(true))
			.catch(err => console.log(err))
		setFavCount(response.likes.length + 1)
	}

	return (
		<Card className='ContentCard'>
			{/* remove if it's your profile page */}
			{type === 'challenge' && (
				<Card.Header className='CardHeader'>
					<img src={responseOwner?.avatar} alt='ProfileAvatar' className='mb-4' />
					<h5>{responseOwner?.firstName} </h5>
				</Card.Header>
			)}

			{/* remove if it's your profile page */}
			<Card.Body className='CardBody'>
				<Col>
					<Card.Title className='CardTitle'>{challenge.question}</Card.Title>
					<Card.Text className='CardText'>{response.response}</Card.Text>
				</Col>
			</Card.Body>

			<Card.Footer className='CardFooter'>
				<Row>
					<Col>
						<button
							className='socialActionButton'
							onClick={
								!isFav
									? () => handleFav(response._id, { action: 'add' })
									: () => handleFav(response._id, { action: 'remove' })
							}>
							{favCount} <span style={{ color: isFav ? 'red' : 'white' }}>♥️</span>{' '}
							Like
						</button>
					</Col>

					{/* this needs to trigger the commentCard */}
					<Col>
						<button
							className='socialActionButton'
							onClick={() => setShowComments(!showComments)}>
							✏️ Comment
						</button>
					</Col>
					{/* this needs to trigger the commentCard */}
				</Row>
			</Card.Footer>

			{showComments && <CommentCardNested />}
		</Card>
	)
}

export default ResponseCard
