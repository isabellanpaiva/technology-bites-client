import { Card, Row, Col } from 'react-bootstrap'
import CommentsSection from '../CommentCard/CommentsSection'
import { useContext, useEffect, useState } from 'react'
import userService from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'
import commentServices from '../../services/comment.services'

const ResponseCard = ({ challenge, response, type, getResponses }) => {
	const { loggedUser } = useContext(AuthContext)

	const [errors, setErrors] = useState([])
	const [responseOwner, setResponseOwner] = useState(null)
	const [showComments, setShowComments] = useState(false)
	const [isFav, setFav] = useState(response.likes.includes(loggedUser._id))
	const [comments, setComments] = useState([])

	useEffect(() => {
		getCommentsUp()
	}, [])

	useEffect(() => {
		userService
			.getOneUser(response.user)
			.then(({ data }) => {
				setResponseOwner(data)
			})
			.catch(err => setErrors(err.response.data.errorMessages))

		getCommentsUp()
	}, [])

	const getCommentsUp = () => {
		commentServices
			.getAllComments(response._id)
			.then(({ data }) => setComments(data))
			.catch(err => setErrors(err.response.data.errorMessages))
	}

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
		<Card className='ContentCard' md={{ span: 8 }}>
			{type === 'challenge' && (
				<Card.Header className='CardHeader'>
					<img
						className='userAvatar mb-2'
						src={responseOwner?.avatar}
						alt='ProfileAvatar'
					/>
					<Card.Title className='CardTitle mt-2'>{responseOwner?.firstName}</Card.Title>
				</Card.Header>
			)}
			<Card.Body className='py-0'>
				<Card.Title>
					{type !== 'challenge' && (
						<h4
							className='PageSubHeading mb-3'
							style={{ lineHeight: '1.4', color: 'black' }}>
							{challenge.question}
						</h4>
					)}
				</Card.Title>
				<Card.Text className='CardResponse mb-2 px-1'>"{response.response}"</Card.Text>
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
							Comments {comments.length}
						</button>
					</Col>
				</Row>
			</Card.Footer>
			{showComments && (
				<CommentsSection
					response={response}
					getResponses={getResponses}
					getCommentsUp={getCommentsUp}
				/>
			)}
		</Card>
	)
}

export default ResponseCard
