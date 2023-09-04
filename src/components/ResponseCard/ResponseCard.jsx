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

	useEffect(() => {
		userService
			.getOneUser(response.user)
			.then(({ data }) => setResponseOwner(data))
			.catch(err => console.log(err))
		checkFavs(response)
	}, [])

	const checkFavs = response => {
		setFav(response.likes.includes(loggedUser._id))
	}

	const addFav = response_id => {
		responseService.addResponseFav(response_id, loggedUser._id)
	}

	return (

		<Card className='ContentCard'>

			{type === 'challenge' && (

				<Card.Header className='CardHeader'>

					<img src={responseOwner?.avatar} alt='ProfileAvatar' className='mb-2' />

					<Card.Title className='CardTitle' style={{ marginBottom: '-1rem' }}>
						{responseOwner?.firstName}
					</Card.Title>

				</Card.Header>

			)}

			<Card.Body className='CardBody'>

				<Card.Title className='CardTitle'>{challenge.question}</Card.Title>

				<Card.Text className='CardText'>{response.response}</Card.Text>

			</Card.Body>

			<Card.Footer className='CardFooter'>
				<Row>
					<Col>
						<button className='socialActionButton' onClick={addFav(response._id)}>
							{response.likes.length} ♥️ Like
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
