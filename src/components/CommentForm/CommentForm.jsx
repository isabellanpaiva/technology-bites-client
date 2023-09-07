import { useContext, useState } from 'react'
import { Alert, Card, FloatingLabel, Form } from 'react-bootstrap'
import commentServices from '../../services/comment.services'
import { AuthContext } from '../../contexts/auth.context'

const CommentForm = ({ response, getComments }) => {
	const [comment, setComment] = useState('')
	const { loggedUser } = useContext(AuthContext)
	const [errors, setErrors] = useState([])

	const handleInputChange = e => {
		setComment(e.target.value)
	}

	const handleSubmitForm = e => {
		e.preventDefault()

		const { _id: user_id } = loggedUser
		const { _id: response_id } = response

		const commentInfo = {
			owner: user_id,
			content: comment,
			relatedResponse: response_id,
		}

		commentServices
			.createComment(commentInfo)
			.then(() => {
				setComment('')
				getComments()
				setErrors([])
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (

		<Card>

			<Card.Header className='CardHeader'>

				<Form onSubmit={handleSubmitForm}>

					<Form.Group className='mt-5' controlId='userResponse'>

						<FloatingLabel
							controlId='floatingTextarea2'
							label='Have something to say about this response?'
						>

							<Form.Control
								className="CommentForm"
								as='textarea'
								placeholder='userComment'
								value={comment}
								onChange={handleInputChange}
								maxLength={140}
							/>

						</FloatingLabel>

						<p style={{ color: 'lightGray' }}>{comment.length}/140</p>

						{errors.length > 0 && comment.length <= 5 && (
							<Alert variant='danger'>{errors[0]}</Alert>
						)}

						<button
							className='socialActionButton mt-3'
							type='submit'
							style={{ fontSize: '1em' }}>
							Publish 📩
						</button>

					</Form.Group>

				</Form>

			</Card.Header>

		</Card >
	)
}

export default CommentForm
