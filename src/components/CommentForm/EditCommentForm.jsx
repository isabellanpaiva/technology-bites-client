import { useState } from 'react'
import { Alert, Card, FloatingLabel, Form } from 'react-bootstrap'
import commentServices from '../../services/comment.services'

const EditCommentForm = ({ comment, setEditing, getComments }) => {
	const [newComment, setComment] = useState(comment.content)
	const [errors, setErrors] = useState([])

	const handleInputChange = e => {
		setComment(e.target.value)
	}

	const handleSubmitForm = e => {
		e.preventDefault()

		commentServices
			.editComment(comment._id, newComment)
			.then(() => {
				setEditing(false)
				getComments()
				setErrors([])
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<Card>
			<Card.Header className='CardHeader'>
				<Form onSubmit={handleSubmitForm}>
					<Form.Group className='mt-4' controlId='userResponse'>
						<FloatingLabel
							controlId='floatingTextarea2'
							label='Have something to say about this response?'>
							<Form.Control
								className='CommentForm'
								as='textarea'
								value={newComment}
								onChange={handleInputChange}
								maxLength={140}
							/>
						</FloatingLabel>
						<p>{newComment.length}/140</p>
						{errors.length > 0 && <Alert variant='danger'>{errors[0]}</Alert>}
						<button
							className='socialActionButton'
							type='submit'
							style={{ fontSize: '1em' }}>
							Save
						</button>
					</Form.Group>
				</Form>
			</Card.Header>
		</Card>
	)
}

export default EditCommentForm
