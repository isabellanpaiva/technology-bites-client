import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import { useContext, useEffect, useState } from 'react'
import challengeServices from '../../services/challenge.services'
import ChallengeForm from '../../components/ChallengeForm/ChallengeForm'
import { AuthContext } from '../../contexts/auth.context'
import responseService from '../../services/response.services'
import CarouselResponses from '../../components/CarouselResponses/CarouselResponses'
import openaiAPIServices from '../../services/openaiAPI.services'

const ChallengePage = () => {
	const { loggedUser } = useContext(AuthContext)

	const [challenge, setChallenge] = useState(null)
	const [myResponse, setMyResponse] = useState(null)
	const [responses, setResponses] = useState([])
	const [errors, setErrors] = useState([])
	const [modalShow, setModalShow] = useState(false)
	const [apiResponse, setApiResponse] = useState('')

	useEffect(() => {
		challenge ? getResponses() : loadChallenge()
	}, [challenge])

	const loadChallenge = () => {
		challengeServices
			// .getDailyChallenge()
			.getOneRandomChallenge()
			.then(({ data }) => {
				setChallenge(data)
				getResponses()
			})
			.catch(err => setErrors(err.response))
	}

	const getResponses = () => {
		responseService
			.getResponsesToChallenge(challenge._id)
			.then(({ data }) => {
				let myResp = data.find(eachResponse => eachResponse.user === loggedUser._id)
				let restResp = data.filter(eachResponse => eachResponse.user !== loggedUser._id)
				setResponses(restResp)
				myResponse ?? setMyResponse(myResp)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	const getApiResponse = userResponse => {
		setModalShow(true)
		openaiAPIServices
			.generateResponse(userResponse, challenge.question)
			.then(({ data }) => {
				setApiResponse(data)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<Container fluid>
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
								getApiResponse={getApiResponse}
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
								<h4 className='PageSubHeading mt-5' style={{ color: 'gray' }}>
									Cool! You are the first the respond this challenge 🥇{' '}
								</h4>
							</Col>
						</Row>
					))}
			</Row>
			<Modal show={modalShow} onHide={() => setModalShow(false)}>
				<Modal.Header closeButton>Feedback from our robot:</Modal.Header>
				<Modal.Body>
					{!apiResponse ? (
						<Row className='justify-content-center'>
							<Col md={{ span: 1 }}>
								<Spinner animation='border' size='sm' role='status' />
							</Col>
						</Row>
					) : (
						apiResponse
					)}
				</Modal.Body>
			</Modal>
		</Container>
	)
}

export default ChallengePage
