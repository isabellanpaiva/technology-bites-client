import { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import DojoQuestion from '../../components/DojoQuestion/DojoQuestion'
import CategoryTags from '../../components/CategoryTags/CategoryTags'
import dojoServices from '../../services/dojo.services'

const DojoPage = () => {
	const [tags, setTags] = useState([])
	const [questions, setQuestions] = useState(null)
	const [selectedTag, setSelectedTag] = useState(null)
	const [answers, setAnswers] = useState([])

	useEffect(() => {
		loadTags()
	}, [])

	const loadTags = () => {
		dojoServices
			.getDojoCategories()
			.then(({ data }) => setTags(data))
			.catch(err => console.log(err))
	}

	const getQuestions = category => {
		setAnswers([])
		setQuestions([])
		dojoServices
			.getDojoQuestions(category)
			.then(({ data }) => setQuestions(data))
			.catch(err => console.log(err))
	}

	const updateAnswers = newAnswer => {
		setAnswers([...answers, newAnswer])
	}

	const correctAnswers = answers.filter(answer => answer === 'right')

	return (
		<Container>
			<section className='section-header'>
				<h1 className='PageHeading'>Dojo</h1>
				<h3 className='PageSubHeading'> Select a category and prove yourself! </h3>
			</section>

			<Row>
				<section className='mt-2 mb-5'>
					<Row>
						{tags &&
							tags.map(tag => (
								<Col
									id={tag}
									key={tag}
									style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
									<CategoryTags
										tag={tag}
										getQuestions={getQuestions}
										setSelectedTag={setSelectedTag}
										selectedTag={selectedTag}
										setAnswers={setAnswers}></CategoryTags>
								</Col>
							))}
					</Row>
				</section>

				<section>
					{questions && (
						<>
							<h3 className='PageSubHeading' style={{ marginBottom: '3em' }}>
								Ready... Set... Go!
							</h3>

							<Row className='justify-content-center'>
								<Col xs={{ span: 11 }} md={{ span: 10 }}>
									{questions.map(question => (
										<DojoQuestion
											key={question._id}
											question={question}
											updateAnswers={updateAnswers}></DojoQuestion>
									))}
								</Col>
							</Row>

							<Row>
								<Col md={{ span: 12 }}>
									<p className='CardText mt-3' style={{ textAlign: 'center' }}>
										Correct answers: {correctAnswers.length}/{questions.length}
									</p>
								</Col>
							</Row>
						</>
					)}
				</section>
			</Row>
		</Container>
	)
}

export default DojoPage
