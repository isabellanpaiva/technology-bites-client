import './../../App.css'
import { Card } from 'react-bootstrap'

const ContentCard = ({ bites, challenge, children }) => {
	return (
		<Card className='ContentCard'>

			<Card.Body>

				<Card.Title className='CardTitle'>
					{bites && bites.category}{' '}
					{challenge && `Today's challenge is about: ${challenge.category}`}
				</Card.Title>

				<Card.Body className='CardText'>
					{challenge && challenge.question}
					{children}
				</Card.Body>

			</Card.Body>
		</Card>
	)
}

export default ContentCard
