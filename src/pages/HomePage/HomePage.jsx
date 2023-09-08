import './HomePage.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Figure } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import biteServices from '../../services/bite.services'
import DogMockup2 from '../../assets/DogMockup2.png'
import IDontKnowWhatImDoing4 from '../../assets/IDontKnowWhatImDoing4.png'
import memeMockup from '../../assets/memeMockup.png'

const HomePage = () => {
	const appName = import.meta.env.VITE_APP_NAME

	const [bites, setBites] = useState({})
	const [errors, setErrors] = useState([])

	useEffect(() => {
		loadBites()
	}, [])

	const loadBites = () => {
		biteServices
			.getOneRandomBite()
			.then(({ data }) => setBites(data[0]))
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<Container fluid>
			<section>
				<Row className='justify-content-center'>
					<Col md={{ span: 12 }}>
						<h1 className='PageHeading'>
							<span className='typing-animation'>{appName}. </span>
						</h1>

						<h1 className='PageSubHeading mt-3'> Nerd stuff made easy  💻</h1>
					</Col>

					<Col lg={{ span: 7 }} md={{ span: 10 }} style={{ marginTop: '3em' }}>
						<ContentCard bites={bites}>
							<p className='plainText mb-3'>{bites.definition}</p>

							<Button className='callToAction mt-4' type='submit' onClick={loadBites}>
								Get Another Bite
							</Button>
						</ContentCard>
					</Col>
				</Row>
			</section>

			<h1 className='PageSubHeading' style={{ marginBottom: '5em' }}>
				{' '}
				Learn. Validate. Connect.
			</h1>

			<section>
				<article>
					<Row className='justify-content-center'>
						<Col>
							<Row className='d-flex align-items-center justify-content-center'>
								<Col
									className='d-flex columnRight'
									md={{ span: 4, justifyContent: 'end' }}
									sm={{ justifyContent: 'center' }}>
									<Figure.Image
										className='mockupImage'
										alt='Mockup'
										src={IDontKnowWhatImDoing4}
										style={{ width: '350px' }}
									/>
								</Col>

								<Col className='columnLeft' md={{ span: 5 }}>
									<h2 className='FeaturesHeading'> Bites 🍿 </h2>
									<h2 className='FeaturesSubHeading'>
										Technology concepts with one click.
									</h2>
									<h2 className='FeaturesSubHeading2'> Grab your bite! </h2>
								</Col>
							</Row>
						</Col>
					</Row>
				</article>

				<article style={{ paddingTop: '15em' }}>
					<Row className='justify-content-center'>
						<Col>
							<Row className='d-flex justify-content-center align-items-center'>
								<Col
									className=' columnRight '
									md={{ span: 6, offset: 1 }}
									sm={{ justifyContent: 'center' }}>
									<h2 className='FeaturesHeading'> Challenges 🥇</h2>
									<h2 className='FeaturesSubHeading'>
										{' '}
										A fresh question everyday.
									</h2>
									<h2 className='FeaturesSubHeading2'>
										{' '}
										Connect, discuss and get inspired!{' '}
									</h2>
								</Col>

								<Col className='columnLeft' md={{ span: 5 }}>
									<Figure.Image
										className='mockupImage'
										alt='Mockup'
										src={DogMockup2}
										style={{ filter: 'grayscale(100%' }}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
				</article>

				<article style={{ paddingTop: '15em' }}>
					<Row className='justify-content-center'>
						<Col>
							<Row className='d-flex align-items-center justify-content-center ms-5'>
								<Col
									className='d-flex columnRight'
									md={{ span: 4, justifyContent: 'end' }}
									sm={{ justifyContent: 'center' }}>
									<Figure.Image
										className='memeMockup'
										alt='Mockup'
										src={memeMockup}
										style={{ width: '400px', filter: 'grayscale(100%' }}
									/>
								</Col>

								<Col className='columnLeft' md={{ span: 5 }}>
									<h2 className='FeaturesHeading ms-5'> Dojo 🥋 </h2>
									<h2 className='FeaturesSubHeading ms-5'>
										{' '}
										10 questions, true or false.{' '}
									</h2>
									<h2 className='FeaturesSubHeading2 ms-5'>
										{' '}
										How many can you get?{' '}
									</h2>
								</Col>
							</Row>
						</Col>
					</Row>
				</article>
			</section>
		</Container>
	)
}

export default HomePage
