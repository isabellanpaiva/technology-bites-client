import { Container, Row, Col } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import { useContext, useEffect, useState } from 'react'
import challengeServices from '../../services/challenge.services'
import ChallengeForm from '../../components/ChallengeForm/ChallengeForm'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'
import CarouselResponses from '../../components/CarouselResponses/CarouselResponses'

const ChallengePage = () => {
	const { loggedUser } = useContext(AuthContext)

	const [challenge, setChallenge] = useState(null)
	const [myResponse, setMyResponse] = useState(null)
	const [responses, setResponses] = useState([])
	const [errors, setErrors] = useState([])

	useEffect(() => {
		challenge ? getResponses() : loadChallenge()
	}, [challenge])

	const loadChallenge = () => {
		challengeServices
			.getDailyChallenge()
			// .getOneChallenge('64f5905da4a69300fd90e816')
			.then(({ data }) => {
				setChallenge(data)
				getResponses()
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const getResponses = () => {
		challenge &&
			responseService
				.getResponsesToChallenge(challenge._id)
				.then(({ data }) => {
					let myResp = data.filter(eachResponse => eachResponse.user === loggedUser._id)
					let restResp = data.filter(eachResponse => eachResponse.user !== loggedUser._id)
					setResponses(restResp)
					myResponse ?? setMyResponse(myResp[0])
				})
				.catch(err => setErrors(err.response.data.errorMessages))
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
								<p className='plainText mt-5 mb-5'>
									You already answered this one ✅
								</p>
								<p className='CardResponse'> "{myResponse.response}"</p>
							</>
						) : (
							<ChallengeForm
								challenge={challenge}
								setMyResponse={setMyResponse}
								getResponses={getResponses}
							/>
						)}
					</ContentCard>
				</Col>
			</Row>

			<Row>
				{myResponse &&
					(responses.length !== 0 ? (
						<CarouselResponses
							responses={responses}
							getResponses={getResponses}
							type={'challenge'}></CarouselResponses>
					) : (
						<Row>
							<Col>
								<p>SO SAD NADIE HA RESPONDIDO UY UY UY </p>
							</Col>
						</Row>
					))}
			</Row>
		</Container>
	)
}

export default ChallengePage
