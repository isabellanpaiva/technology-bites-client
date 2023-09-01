import './HomePage.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Figure } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import biteServices from '../../services/bite.services'
// import iphoneMockup from '../../assets/iphoneMockup'

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

			<section>

				<Row>
					<Col>

						<h1 className='PageHeading'>{appName}</h1>

						<h3 className='PageSubHeading'>Learn. Validate. Connect. </h3>

						<ContentCard bites={bites} fireFinalActions={fireFinalActions}>
							<p>{bites.definition}</p>
						</ContentCard>

					</Col>
				</Row>

			</section>

			{/* <section>

				<Row>

					<Col md={6}>
						<h2 className='Features'> Bites</h2>

						<h4 className='FeaturesText'> Learn a new technology concept with one click. </h4>

					</Col >

					<Col md={6}>

						<h1>test</h1>

						<Figure.Image
							width={171}
							height={180}
							alt="171x180"
							src="iphoneMockup"
						/>

					</Col>

				</Row>

				<Row>

					<h2 className='Features'> Challenges</h2>

					<h3 className='FeaturesText'> Learn a new technology concept with one click. Grab your bite! </h3>

				</Row>

			</section> */}

		</Container>
	)
}

export default HomePage
