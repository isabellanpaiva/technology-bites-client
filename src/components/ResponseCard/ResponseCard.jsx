import './ResponseCard.css'
import { Card, Row, Col, Accordion } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'
import CommentCard from '../CommentCard/CommentCard'
import { useEffect, useState } from 'react'
import userService from '../../services/user.services'

const ResponseCard = ({ challenge, response }) => {
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
			<Card.Header className='CardHeader'>
				<img src={responseOwner?.avatar} alt='ProfileAvatar' className='mb-4' />
				<h5>{responseOwner?.firstName} </h5>
			</Card.Header>

			{/* remove if it's your profile page */}
			<Card.Body className='CardBody'>
				<Col>
					<Card.Title className='CardTitle'>{challenge.question}</Card.Title>
					<Card.Text className='CardText'>{response.response}</Card.Text>
				</Col>
			</Card.Body>

			<Card.Footer className='CardFooter'>
				<Row>
					<Col>Icon 1</Col>

					{/* this needs to trigger the commentCard */}
					<Col>
						<p>Icon 2</p>
					</Col>
					{/* this needs to trigger the commentCard */}
				</Row>
			</Card.Footer>
		</Card>
	)
}

export default ResponseCard
