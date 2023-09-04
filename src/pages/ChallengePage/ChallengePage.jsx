import { Container, Row, Col } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import { useContext, useEffect, useState } from 'react'
import challengeServices from '../../services/challenge.services'
import ChallengeForm from '../../components/ChallengeForm/ChallengeForm'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'

const ChallengePage = () => {
	const [challenge, setChallenge] = useState(null)
	const [myResponse, setMyResponse] = useState(null)
	const [responses, setResponses] = useState([])

	const { loggedUser } = useContext(AuthContext)

	useEffect(() => {
		loadChallenge()
		challenge && getResponses()
	}, [challenge])

	const loadChallenge = () => {
		challengeServices
			.getOneChallenge('64f5905da4a69300fd90e880')
			.then(({ data }) => setChallenge(data))
			.catch(err => console.log(err))
	}

	const getResponses = () => {
		responseService
			.getResponsesToChallenge(challenge._id)
			.then(({ data }) => {
				let myResp = data.filter(eachResponse => eachResponse.user === loggedUser._id)
				let restResp = data.filter(eachResponse => eachResponse.user !== loggedUser._id)
				setResponses(restResp)
				setMyResponse(myResp[0])
			})
			.catch(err => console.log(err))
	}

	return (
		<Container className='ChallengesPage'>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<h1 className='PageHeading'>Daily Challenge</h1>

					<ContentCard challenge={challenge}>
						{myResponse ? (
							<>
								<p>You already answered this one!</p>
								{myResponse ? <p>{myResponse.response}</p> : <p>Loading...</p>}
							</>
						) : (
							<ChallengeForm challenge={challenge} setMyResponse={setMyResponse} />
						)}
					</ContentCard>
				</Col>
			</Row>

			<Row>
				{myResponse &&
					responses.map(response => {
						return (
							<Col key={response._id}>
								<ResponseCard
									response={response}
									challenge={challenge}
									type={'challenge'}></ResponseCard>
							</Col>
						)
					})}
			</Row>
		</Container>
	)
}

export default ChallengePage
