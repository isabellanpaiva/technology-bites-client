import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import { useContext, useEffect, useState } from 'react'
import challengeServices from '../../services/challenge.services'
import { AuthContext } from '../../contexts/auth.context'

const ChallengePage = () => {
	const [challenges, setChallenges] = useState({})
	const [userResponse, setUserResponse] = useState('')

	const { loggedUser } = useContext(AuthContext)

	useEffect(() => {
		loadChallenge()
	}, [])

	const loadChallenge = () => {
		challengeServices
			.getOneRandom()
			// .getOne('ID')
			.then(({ data }) => setChallenges(data[0]))
			.catch(err => console.log(err))
	}

	const handleInputChange = e => {
		setUserResponse(e.target.value)
	}

	const handleSubmitForm = e => {
		e.preventDefault()

		const user_id = loggedUser._id
		const challenge_id = challenges._id
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
		<Container className='ChallengesPage'>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<h1 className='PageHeading'>Daily Challenge</h1>

					<ContentCard challenges={challenges}>
						<Form onSubmit={handleSubmitForm}>
							<Form.Group className='mb-3' controlId='userResponse'>
								<Form.Label>Response</Form.Label>
								<Form.Control
									type='text'
									name='userResponse'
									value={userResponse}
									onChange={handleInputChange}
								/>
								<Button variant='primary' type='submit' className='mt-3'>
									Submit answer
								</Button>
							</Form.Group>
						</Form>
					</ContentCard>
				</Col>
			</Row>
		</Container>
	)
}

export default ChallengePage
