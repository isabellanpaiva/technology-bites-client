import { Card, Row, Col, Accordion } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'
import CommentCardNested from '../CommentCard/CommentCard-nested'
import { useEffect, useState } from 'react'
import userService from '../../services/user.services'

const ResponseCard = ({ challenge, response, type }) => {
	const [responseOwner, setResponseOwner] = useState(null)

	useEffect(() => {
		userService
			.getOneUser(response.user)
			.then(({ data }) => setResponseOwner(data))
			.catch(err => console.log(err))
	}, [])

	return (
		<Card className='ContentCard'>
			{/* remove if it's your profile page */}
			{type === 'challenge' && (
				<Card.Header className='CardHeader'>
					<img src={responseOwner?.avatar} alt='ProfileAvatar' className='mb-4' />
					<h5>{responseOwner?.firstName} </h5>
				</Card.Header>
			)}

			{/* remove if it's your profile page */}
			<Card.Body className='CardBody'>
				<Col>
					<Card.Title className='CardTitle'>{challenge.question}</Card.Title>
					<Card.Text className='CardText'>{response.response}</Card.Text>
				</Col>
			</Card.Body>

			<Card.Footer className='CardFooter'>
				<Row>
					<Col>
						<button className='socialActionButton'>Like</button>
					</Col>

					{/* this needs to trigger the commentCard */}
					<Col>
						<button className='socialActionButton'>Comment</button>
					</Col>
					{/* this needs to trigger the commentCard */}
				</Row>
			</Card.Footer>

			{type !== 'challenge' && <CommentCardNested />}
		</Card>
	)
}

export default ResponseCard
