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
		<Container className='PageContainer'>
			<section style={{ marginBottom: '5em' }}>
				<h1 className='PageHeading' style={{ fontSize: '3em' }}>
					Dojo
				</h1>

				<h3 className='PageSubHeading'> Select a category and prove yourself! </h3>
			</section>

			<Row>
				<section className='mb-5'>
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
										setAnswers={setAnswers}
									/>
								</Col>
							))}
					</Row>
				</section>

				<section>
					{questions && (
						<>
							{questions.map(question => (
								<DojoQuestion
									key={question._id}
									className='dojoList'
									question={question}
									updateAnswers={updateAnswers}></DojoQuestion>
							))}
							<Row className='justify-content-center'>
								<Col md={{ span: 2 }}>
									<p>
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
