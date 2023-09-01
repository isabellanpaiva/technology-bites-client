import './ContentCard.css'
import { Button, Card } from 'react-bootstrap'

const ContentCard = ({ bites, challenges, children }) => {
	return (
		<Card className='ContentCard'>
			<Card.Body>
				{/* bite: concept / challenge: question / dojo: concept */}
				<Card.Title className='CardTitle'>
					{bites && bites.category}{' '}
					{challenges && `Today's challenge is about: ${challenges.category}`}
				</Card.Title>

				{/* bite: random bite / challenge: submit user response / dojo: true or false */}
				<Card.Text className='CardText'>
					{challenges && challenges.question}
					{children}
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default ContentCard
