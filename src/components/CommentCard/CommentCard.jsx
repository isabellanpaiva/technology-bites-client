import { useContext, useState } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth.context'
import commentServices from '../../services/comment.services'
import EditCommentForm from '../CommentForm/EditCommentForm'

const CommentCard = ({ comment, getComments }) => {
	const { loggedUser } = useContext(AuthContext)

	const [editing, setEditing] = useState(false)

	const { owner, content } = comment

	const handleDeleteComment = () => {
		commentServices
			.deleteComment(comment._id)
			.then(() => getComments())
			.catch(err => console.log(err))
	}
	return (
		<Card className='ContentCard' style={{ fontSize: '0.8em' }}>

			<Card.Body>

				<Row>
					<Col md={{ span: 2 }}>
						<div>
							<img className='userAvatar' src={owner.avatar} alt='ProfileAvatar' />
						</div>

						<div className='mt-2'>
							<strong>{owner.firstName}</strong>
						</div>
					</Col>

					<Col md={{ span: 8 }}>
						{!editing ? (
							<Card.Text className='CardText'>{content} </Card.Text>
						) : (
							<EditCommentForm
								comment={comment}
								setEditing={setEditing}
								getComments={getComments}></EditCommentForm>
						)}

						<div>
							{loggedUser._id === owner._id && (
								<>
									<button
										className='socialActionButton'
										onClick={() => setEditing(true)}>
										Edit ✏️
									</button>
									<button
										className='socialActionButton'
										onClick={() => handleDeleteComment()}>
										Delete 🗑
									</button>
								</>
							)}
						</div>
					</Col>
				</Row>

			</Card.Body>

		</Card>
	)
}

export default CommentCard
