import { Card, Row, Col } from 'react-bootstrap'
import CommentsSection from '../CommentCard/CommentsSection'
import { useContext, useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'

const ResponseCard = ({ challenge, response, type, getResponses }) => {
	const { loggedUser } = useContext(AuthContext)

	const [errors, setErrors] = useState([])
	const [responseOwner, setResponseOwner] = useState(null)
	const [showComments, setShowComments] = useState(false)
	const [isFav, setFav] = useState(response.likes.includes(loggedUser._id))

	useEffect(() => {
		userService
			.getOneUser(response.user)
			.then(({ data }) => {
				setResponseOwner(data)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}, [])

	const handleFav = (response_id, { action }) => {
		responseService
			.handleResponseFav(response_id, loggedUser._id, action)
			.then(() => {
				getResponses()
				setFav(!isFav)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<Card className='ContentCard'>
			{type === 'challenge' && (
				<Card.Header className='CardHeader'>
					<img
						className='userAvatar mb-2'
						src={responseOwner?.avatar}
						alt='ProfileAvatar'
					/>

					<Card.Title className='CardTitle' style={{ marginBottom: '-1rem' }}>
						{responseOwner?.firstName}
					</Card.Title>
				</Card.Header>
			)}

			<Card.Body className='CardBody'>
				<Card.Title>
					<h4 className='PageSubHeading mb-5' style={{ lineHeight: '2', color: 'black' }}>
						{challenge.question}
					</h4>
				</Card.Title>

				<Card.Text className='CardText mb-5'>{response.response}</Card.Text>
			</Card.Body>

			<Card.Footer className='CardFooter'>
				<Row>
					<Col>
						<button
							disabled={responseOwner?._id === loggedUser._id}
							className='socialActionButton'
							onClick={
								!isFav
									? () => handleFav(response._id, { action: 'add' })
									: () => handleFav(response._id, { action: 'remove' })
							}>
							{responseOwner?._id !== loggedUser._id && 'Like'}
							<span style={{ color: isFav ? 'red' : 'black' }}> ♥️ </span>
						</button>
						{response.likes.length}
					</Col>
					<Col>
						<button
							className='socialActionButton'
							onClick={() => setShowComments(!showComments)}>
							Comment ✏️
						</button>
					</Col>
				</Row>
			</Card.Footer>

			{showComments && <CommentsSection response={response} getResponses={getResponses} />}
		</Card>
	)
}

export default ResponseCard
