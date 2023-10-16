import { Button, Form, Modal } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'
import openaiAPIServices from '../../services/openaiAPI.services'
import FormError from '../FormError/FormError'

const ChallengeForm = ({ challenge, setMyResponse, getResponses, getApiResponse }) => {
	const [userResponse, setUserResponse] = useState('')
	const { loggedUser } = useContext(AuthContext)
	const [errors, setErrors] = useState([])

	const handleInputChange = e => {
		setUserResponse(e.target.value)
	}

	const handleSubmitForm = e => {
		e.preventDefault()

		const { _id: user_id } = loggedUser
		const { _id: challenge_id } = challenge

		const responseInfo = {
			user_id,
			userResponse,
			challenge_id,
		}

		if (userResponse !== '') {
			responseService
				.createOneResponse(responseInfo)
				.then(() => {
					setMyResponse(userResponse)
					getApiResponse(userResponse)
					getResponses()
				})
				.catch(err => setErrors(err.response.data.errorMessages))
		} else {
			setErrors(['Ops, your answer must be at least five characters long'])
		}
	}

	return (
		<>
			<Form onSubmit={handleSubmitForm}>
				<Form.Group className='mt-4 mb-3' controlId='userResponse'>
					<Form.Control
						type='text'
						style={{ width: '80%', margin: '0 auto' }}
						name='userResponse'
						value={userResponse}
						placeholder='Type your answer here!'
						onChange={handleInputChange}
					/>
					{errors.length > 0 && (
						<FormError className='mb-0'>
							{errors.map(elm => (
								<p key={elm} style={{ fontSize: '.8em' }}>
									{elm}
								</p>
							))}
						</FormError>
					)}
					<Button variant='primary' type='submit' className='callToAction mt-3'>
						Submit answer
					</Button>
				</Form.Group>
			</Form>
		</>
	)
}

export default ChallengeForm
