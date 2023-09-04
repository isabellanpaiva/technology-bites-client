import { Button, Form } from 'react-bootstrap'
import challengeServices from '../../services/challenge.services'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'

const ChallengeForm = ({ challenge, setMyResponse }) => {
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
			userResponse,
			challenge_id,
		}

		responseService
			.createOneResponse(responseInfo)
			.then(createdResponse => setMyResponse(createdResponse.response))
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
