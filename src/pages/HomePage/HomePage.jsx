import './HomePage.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import biteServices from '../../services/bite.services'

const HomePage = () => {
	const appName = import.meta.env.VITE_APP_NAME

	const [bites, setBites] = useState({})

	useEffect(() => {
		loadBites()
	}, [])

	const loadBites = () => {
		biteServices
			.getOneRandom()
			.then(({ data }) => setBites(data[0]))
			.catch(err => console.log(err))
	}
	const fireFinalActions = () => {
		loadBites()
	}

	return (
		<Container className='HomePage'>
			<Row>
				<Col>
					<section>
						<h1 className='PageHeading'>{appName}</h1>

						<h3 className='PageSubHeading'>Learn. Validate. Connect. </h3>

						<ContentCard bites={bites} fireFinalActions={fireFinalActions}>
							<p>{bites.definition}</p>
						</ContentCard>
					</section>
				</Col>
			</Row>
		</Container>
	)
}

export default HomePage
