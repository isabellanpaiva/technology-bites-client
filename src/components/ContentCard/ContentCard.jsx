import './ContentCard.css'
import { Button, Card } from 'react-bootstrap'

const ContentCard = ({ bites, challenge, children }) => {
	return (
		<Card className='ContentCard'>
			<Card.Body>
				{/* bite: concept / challenge: question / dojo: concept */}
				<Card.Title className='CardTitle'>
					{bites && bites.category}{' '}
					{challenge && `Today's challenge is about: ${challenge.category}`}
				</Card.Title>

				{/* bite: random bite / challenge: submit user response / dojo: true or false */}
				<Card.Body className='CardText'>
					{challenge && challenge.question}
					{children}
				</Card.Body>
			</Card.Body>
		</Card>
	)
}

export default ContentCard
