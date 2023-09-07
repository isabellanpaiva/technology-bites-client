import { Card } from 'react-bootstrap'
import CommentForm from '../CommentForm/CommentForm'
import CommentCard from './CommentCard'
import { useEffect, useState } from 'react'
import commentServices from '../../services/comment.services'

const CommentsSection = ({ response }) => {
	const [comments, setComments] = useState([])

	useEffect(() => {
		getComments()
	}, [])

	const getComments = () => {
		commentServices
			.getAllComments(response._id)
			.then(({ data }) => setComments(data))
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<Card className='mt-' style={{ border: 'none' }}>
			<Card.Header className='CardHeader'>
				<CommentForm response={response} getComments={getComments} />
			</Card.Header>

			{comments.length ? (
				<Card.Body
					className='CardBody ms-5 overflow-scroll '
					style={{ maxHeight: '900px' }}>
					{comments.map(comment => (
						<CommentCard
							key={comment._id}
							comment={comment}
							getComments={getComments}
						/>
					))}
				</Card.Body>
			) : (
				<h3>Be the first to leave a comment 🌚</h3>
			)}
		</Card>
	)
}

export default CommentsSection
