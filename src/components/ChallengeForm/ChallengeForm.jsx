import { Button, Form } from 'react-bootstrap'
import challengeServices from '../../services/challenge.services'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const ChallengeForm = ({ challenge }) => {
	const [userResponse, setUserResponse] = useState('')
	const { loggedUser } = useContext(AuthContext)

	const handleInputChange = e => {
		setUserResponse(e.target.value)
	}

	const handleSubmitForm = e => {
		e.preventDefault()

		const { _id: user_id } = loggedUser
		const { _id: challenge_id } = challenge

		const responseInfo = {
			user_id,
			challenge_id,
			userResponse,
		}

		challengeServices
			.saveResponse(responseInfo)
			.then(() => console.log(responseInfo))
			.catch(err => console.log(err))
	}

	return (
		<Form onSubmit={handleSubmitForm}>
			<Form.Group className='mb-3' controlId='userResponse'>
				<Form.Label>Response</Form.Label>
				<Form.Control
					type='text'
					name='userResponse'
					value={userResponse}
					onChange={handleInputChange}
				/>
				<Button variant='primary' type='submit' className='callToAction mt-3'>
					Submit answer
				</Button>
			</Form.Group>
		</Form>
	)
}

export default ChallengeForm
