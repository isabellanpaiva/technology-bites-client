import { React, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Figure } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'
import biteServices from '../../services/bite.services'
import DogMockup2 from '../../assets/DogMockup2.png'
import IDontKnowWhatImDoing4 from '../../assets/IDontKnowWhatImDoing4.png'
import memeMockup from '../../assets/memeMockup.png'
import Typed from 'typed.js'

const HomePage = () => {
	const appName = import.meta.env.VITE_APP_NAME

	const [bites, setBites] = useState({})
	const [errors, setErrors] = useState([])

	useEffect(() => {
		loadBites()
		const typed = new Typed('.typed', {
			strings: ['Technology Bites '],
			startDelay: 300,
			backDelay: 2000,
			loop: true,
			loopCount: Infinity,
			backSpeed: 40,
			typeSpeed: 40,
		})

		return () => {
			// Destroy Typed instance during cleanup to stop animation
			typed.destroy()
		}
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
							{/* <span className='typing-animation'>{appName}. </span> */}
							<span className='typed'></span>
						</h1>

						<h1 className='PageSubHeading mt-3' style={{ color: 'black' }}>
							Your online platform to learn and explore tech concepts 💻
						</h1>
					</Col>

					<Col lg={{ span: 7 }} md={{ span: 10 }} style={{ marginTop: '3em' }}>
						<ContentCard bites={bites}>
							<Button className='callToAction mt-4' type='submit' onClick={loadBites}>
								Get Another Bite
							</Button>
						</ContentCard>
					</Col>
				</Row>

				<h1 className='PageSubHeading' style={{ marginTop: '2em', color: 'black' }}>
					{' '}
					Nerd stuff made easy 🤓
				</h1>
			</section>

			<section
				style={{
					paddingTop: '10em',
					paddingBottom: '10em',
					marginTop: '15em',
					marginBottom: '15em',
					backgroundColor: '#191919',
					color: 'white',
				}}>
				<h1 className='PageSubHeading' style={{ marginBottom: '5em', color: 'white' }}>
					{' '}
					How does it work
					{/* Simple as this */}
				</h1>
				<Row className='justify-content-center'>
					<Col className='text-center' md={3}>
						<h2 style={{ marginBottom: '1em' }}> 1</h2>
						<h3 style={{ marginBottom: '2em' }}>Subscribe</h3>
						<h4 style={{ marginBottom: '1em' }}>Create your profile</h4>
						<h4 style={{ marginBottom: '1em' }}>and get started</h4>
					</Col>
					<Col className='text-center' md={3}>
						<h2 style={{ marginBottom: '1em' }}>2</h2>
						<h3 style={{ marginBottom: '2em' }}>Learn</h3>
						<h4 style={{ marginBottom: '1em' }}>Push your brain </h4>
						<h4 style={{ marginBottom: '1em' }}>to the next level</h4>
					</Col>
					<Col className='text-center' md={3}>
						<h2 style={{ marginBottom: '1em' }}>3</h2>
						<h3 style={{ marginBottom: '2em' }}>Connect</h3>
						<h4 style={{ marginBottom: '1em' }}>Meet new people </h4>
						<h4 style={{ marginBottom: '1em' }}>while discussing technology </h4>
					</Col>
				</Row>
			</section>
			<section className='mb-5'>
				<article>
					<Row className='justify-content-center'>
						<Col>
							<Row className='d-flex align-items-center justify-content-center'>
								<Col
									className='d-flex columnRight justify-content-end'
									md={{ span: 4, justifyContent: 'end' }}
									sm={{ justifyContent: 'center' }}>
									<Figure.Image
										className='mockupImage'
										alt='Mockup'
										src={IDontKnowWhatImDoing4}
										style={{ width: '350px', marginRight: '2em' }}
									/>
								</Col>
								<Col className='columnLeft' md={{ span: 5 }}>
									<h2 className='FeaturesHeading'> Bites </h2>
									<h2 className='FeaturesSubHeading'>
										Technology concepts with one click.
									</h2>
									<h2 className='FeaturesSubHeading2'> Grab your bite! </h2>
								</Col>
							</Row>
						</Col>
					</Row>
				</article>
				<article
					style={{
						marginTop: '10em',
						paddingTop: '20em',
						paddingBottom: '20em',
						backgroundColor: '#191919',
					}}>
					<h1 className='PageSubHeading' style={{ color: 'white' }}>
						{' '}
						Powered by Open IA :cerebro:
					</h1>
				</article>
				<article style={{ paddingTop: '15em' }}>
					<Row className='justify-content-center'>
						<Col>
							<Row className='d-flex justify-content-center align-items-center'>
								<Col
									className=' columnRight '
									md={{ span: 6, offset: 0 }}
									sm={{ justifyContent: 'center' }}
									style={{ textAlign: 'end', marginRight: '2em' }}>
									<h2 className='FeaturesHeading'> Challenges</h2>
									<h2 className='FeaturesSubHeading'>
										A fresh question everyday.
									</h2>
									<h2 className='FeaturesSubHeading2'>
										Connect, discuss and get inspired!
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
				<article
					style={{
						marginTop: '10em',
						paddingTop: '20em',
						paddingBottom: '20em',
						backgroundColor: '#191919',
					}}>
					<h1 className='PageSubHeading' style={{ color: 'white' }}>
						{' '}
						Designed for begginers :mochila:
					</h1>
				</article>
				<article style={{ paddingTop: '15em', marginBottom: '15em' }}>
					<Row className='justify-content-center'>
						<Col>
							<Row className='d-flex align-items-center justify-content-center ms-5'>
								<Col
									className='d-flex columnRight justify-content-end'
									md={{ span: 4, justifyContent: 'end' }}
									sm={{ justifyContent: 'center' }}>
									<Figure.Image
										className='memeMockup'
										alt='Mockup'
										src={memeMockup}
										style={{
											width: '400px',
											filter: 'grayscale(100%',
											marginRight: '2em',
										}}
									/>
								</Col>
								<Col className='columnLeft' md={{ span: 5 }}>
									<h2 className='FeaturesHeading ms-5'> Dojo </h2>
									<h2 className='FeaturesSubHeading ms-5'>
										{' '}
										True or false questions.{' '}
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
