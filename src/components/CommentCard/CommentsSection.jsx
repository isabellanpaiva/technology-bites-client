import { Card } from 'react-bootstrap'
import CommentForm from '../CommentForm/CommentForm'
import CommentCard from './CommentCard'
import { useEffect, useState } from 'react'
import commentServices from '../../services/comment.services'

const CommentsSection = ({ response, getCommentsUp }) => {
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
		<Card>
			<Card.Header className='CardHeader' style={{ width: '90%', margin: '0 auto' }}>
				<CommentForm
					response={response}
					getComments={getComments}
					getCommentsUp={getCommentsUp}
				/>
			</Card.Header>

			{comments.length ? (
				<Card.Body className=' overflow-scroll ' style={{ maxHeight: '900px' }}>
					{comments.map(comment => (
						<CommentCard
							key={comment._id}
							comment={comment}
							getComments={getComments}
							getCommentsUp={getCommentsUp}
						/>
					))}
				</Card.Body>
			) : (
				<p className='my-2' style={{ fontSize: '1em' }}>
					Be the first to leave a comment!
				</p>
			)}
		</Card>
	)
}

export default CommentsSection
