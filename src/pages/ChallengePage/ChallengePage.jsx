import { Container, Row, Col } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import { useEffect, useState } from 'react'
import challengeServices from '../../services/challenge.services'
import ChallengeForm from '../../components/ChallengeForm/ChallengeForm'

const ChallengePage = () => {
	const [challenge, setChallenge] = useState({})

	useEffect(() => {
		loadChallenge()
	}, [])

	const loadChallenge = () => {
		challengeServices
			.getOneRandomChallenge()
			.then(({ data }) => setChallenge(data[0]))
			.catch(err => console.log(err))
	}

	return (
		<Container className='ChallengesPage'>
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<h1 className='PageHeading'>Daily Challenge</h1>

					<ContentCard challenge={challenge}>
						<ChallengeForm challenge={challenge} />
					</ContentCard>
				</Col>
			</Row>
		</Container>
	)
}

export default ChallengePage
