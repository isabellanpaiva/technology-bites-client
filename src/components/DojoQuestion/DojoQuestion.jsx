import { useState } from 'react'
import './../../App.css'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const DojoQuestion = ({ question, updateAnswers }) => {
	const [questionState, setQuestionState] = useState('pending')

	const checkResponse = userAnswer => {
		const result = question.validation === userAnswer ? 'right' : 'wrong'
		setQuestionState(result)
		updateAnswers(result)
	}

	return (
		<>
			<Row
				className='dojoQuestion justify-content-between align-items-center'
				// style={{
				// 	padding: '24px',
				// 	backgroundColor:
				// 		questionState === 'right'
				// 			? '#c3e6bb'
				// 			: questionState === 'wrong'
				// 				? '#e6bdbbac'
				// 				: '#f1f3f7',
				// }}
			>
				<Col md={{ span: 9 }}>
					<p className='CardText' style={{ marginTop: '1em', lineHeight: '1.5em' }}>
						{question.statement}
					</p>
				</Col>

				<Col md={{ span: 3 }}>
					<Row className='justify-content-center'>
						{questionState === 'pending' && (
							<>
								<Row className='justify-content-center'>
									<Col md={{ span: 6 }} xs={{ span: 2 }}>
										<button
											className='socialActionButton'
											onClick={() => checkResponse(true)}>
											True
										</button>
									</Col>
									<Col md={{ span: 6 }} xs={{ span: 2 }}>
										<button
											className='socialActionButton'
											onClick={() => checkResponse(false)}>
											False
										</button>
									</Col>
								</Row>
							</>
						)}
						{questionState === 'right' && (
							<FontAwesomeIcon
								icon={faCheck}
								style={{ color: '#5bb988', fontSize: '2em' }}
							/>
						)}
						{questionState === 'wrong' && (
							<FontAwesomeIcon
								icon={faXmark}
								style={{ color: '#e66060', fontSize: '2em' }}
							/>
						)}
					</Row>
				</Col>
			</Row>
		</>
	)
}

export default DojoQuestion
