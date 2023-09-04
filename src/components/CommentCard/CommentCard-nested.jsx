import { Card, Row, Col, FloatingLabel, Form } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'
import CommentForm from '../CommentForm/CommentForm'

const CommentsCard = () => {
	return (
		<Card className='mt-' style={{ border: 'none' }}>
			<Card.Header className='CardHeader' style={{ padding: '3em' }}>
				<CommentForm />
			</Card.Header>

			{/* create body forEach card */}

			<Card.Body className='CardBody ms-5'>
				<Row className='mt-3 mb-5'>
					<Col md={{ span: 2 }}>
						<div>
							<img
								src={testImage}
								alt='ProfileAvatar'
								style={{ width: '145%', height: '8em' }}
							/>
						</div>

						<div className='mt-2 ms-'>
							<strong>Isabella</strong>
						</div>
					</Col>

					<Col md={{ span: 10 }}>
						<Card.Text className='CardText'>
							"This is super cool! Thank you for sharing time and vision with me. I
							agree 100% and think that you should get a raise. Let mer call your
							boss!"
						</Card.Text>

						{/* add conditional rendering */}

						<button className='socialActionButton'>Edit</button>

						<button className='socialActionButton'>Delete</button>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default CommentsCard
