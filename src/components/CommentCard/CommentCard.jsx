import { useContext, useState } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import commentServices from '../../services/comment.services'
import EditCommentForm from '../CommentForm/EditCommentForm'

const CommentCard = ({ comment, getComments, getCommentsUp }) => {
	const { loggedUser } = useContext(AuthContext)

	const [editing, setEditing] = useState(false)

	const { owner, content } = comment

	const handleDeleteComment = () => {
		commentServices
			.deleteComment(comment._id)
			.then(() => {
				getComments()
				getCommentsUp()
			})
			.catch(err => console.log(err))
	}
	return (
		<Card className='ContentCard' style={{ fontSize: '0.8em' }}>
			<Card.Body>
				<Row>
					<Col
						lg={{ span: 4 }}
						style={{ textAlign: 'middle' }}
						className='text-align-center'>
						<Link to={`/profile/${owner._id}`} className='nav-link'>
							<img className='userAvatar2' src={owner.avatar} alt='ProfileAvatar' />
						</Link>

						<div className='mt-2'>
							<strong>{owner.firstName}</strong>
						</div>
					</Col>

					<Col lg={{ span: 8 }}>
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
