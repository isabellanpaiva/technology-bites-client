import { Container, Row, Col } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import { useContext, useEffect, useState } from 'react'
import challengeServices from '../../services/challenge.services'
import ChallengeForm from '../../components/ChallengeForm/ChallengeForm'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import { AuthContext } from '../../contexts/auth.context'

const ChallengePage = () => {
	const [challenge, setChallenge] = useState(null)
	const [isCompleted, setIsCompleted] = useState(false)
	const [myResponse, setMyResponse] = useState(null)

	const { loggedUser } = useContext(AuthContext)

	useEffect(() => {
		loadChallenge()
		getMyResponse()
	}, [isCompleted])

	useEffect(() => {
		checkIfCompleted()
	}, [challenge])

	const loadChallenge = () => {
		challengeServices
			.getOneChallenge('64f38d0a199beddab624fe68')
			.then(({ data }) => setChallenge(data))
			.catch(err => console.log(err))
	}

	const checkIfCompleted = () => {
		setIsCompleted(challenge?.responses?.some(response => response.user === loggedUser._id))
	}

	const getMyResponse = () => {
		setMyResponse(challenge?.responses?.filter(response => response.user === loggedUser._id))
	}

	return (

		<Container className='PageContainer'>

			<section style={{ marginBottom: '5em' }}>

				<h1 className='PageHeading' style={{ fontSize: '3em' }}> Challenges </h1>

				<h3 className='PageSubHeading'> A new technology question everyday </h3>

			</section>

			<Row>

				<ContentCard challenge={challenge}>

					{isCompleted ? (
						<>
							<p>You already answered this one!</p>
							{myResponse ? <p>{myResponse[0].response}</p> : <p>Loading...</p>}
						</>
					) : (
						<ChallengeForm
							challenge={challenge}
							setIsCompleted={setIsCompleted}
							setMyResponse={setMyResponse}
						/>
					)}
				</ContentCard>

			</Row>
			{
				challenge && (
					<Row>
						{challenge?.responses?.map(response => {
							return (
								<Col key={response._id} md={{ span: 4 }}>
									<ResponseCard
										response={response}
										challenge={challenge}></ResponseCard>
								</Col>
							)
						})}
					</Row>
				)
			}
		</Container >
	)
}

export default ChallengePage
