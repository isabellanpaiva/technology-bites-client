import './../../App.css'
import { Card } from 'react-bootstrap'

const ContentCard = ({ bites, challenge, children }) => {

	return (

		<Card className='ContentCard'>

			<Card.Body>

				<Card.Title>
					<h3
						className='PageSubHeading mb-4'
						style={{ color: 'black' }}
					>
						{bites && bites.category} {challenge && ` ${challenge.category}`}
					</h3>
				</Card.Title>

				<Card.Title>
					<h4 className='PageSubHeading mt-0' style={{ lineHeight: '2' }}>{challenge && challenge.question}</h4>
					{children}
				</Card.Title>

			</Card.Body>

		</Card>
	)
}

export default ContentCard
