import { Container, Row, Col } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import { useContext, useEffect, useState } from 'react'
import challengeServices from '../../services/challenge.services'
import ChallengeForm from '../../components/ChallengeForm/ChallengeForm'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'
import CarouselChallenge from '../../components/CarouselChallenge/CarouselChallenge'

const ChallengePage = () => {
	const [challenge, setChallenge] = useState(null)
	const [myResponse, setMyResponse] = useState(null)
	const [responses, setResponses] = useState([])

	const { loggedUser } = useContext(AuthContext)

	useEffect(() => {
		challenge ? getResponses() : loadChallenge()
	}, [challenge])

	const loadChallenge = () => {
		challengeServices
			.getOneChallenge('64f5905da4a69300fd90e80a')
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
		<Container className='PageContainer'>
			<section style={{ marginBottom: '5em' }}>
				<h1 className='PageHeading' style={{ fontSize: '3em' }}>
					Challenges
				</h1>

				<h3 className='PageSubHeading'> A new technology question everyday </h3>
			</section>

			<Row>
				<Col>
					<ContentCard challenge={challenge}>
						{myResponse ? (
							<>
								<p>You already answered this one!</p>
								<p>{myResponse.response}</p>
							</>
						) : (
							<ChallengeForm challenge={challenge} setMyResponse={setMyResponse} />
						)}
					</ContentCard>
				</Col>
			</Row>

			<Row>
				{myResponse && responses.length !== 0 && (
					<CarouselChallenge responses={responses} type={'challenge'}></CarouselChallenge>
				)}
			</Row>
		</Container>
	)
}

export default ChallengePage
