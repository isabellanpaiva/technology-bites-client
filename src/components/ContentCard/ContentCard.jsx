import './../../App.css'
import { Card } from 'react-bootstrap'

const ContentCard = ({ bites, challenge, children }) => {
	return (
		<Card className='ContentCard'>
			<Card.Body>
				<Card.Title>
					<h3 className=' mb-5' style={{ color: 'black' }}>
						{bites && bites.category} {challenge && `${challenge.category}`}
					</h3>
				</Card.Title>
				<Card.Title>
					<h5
						className='m-4'
						style={{ lineHeight: '1.6', color: challenge ? '#0070f3' : 'black' }}>
						{bites && bites.definition}
						{challenge && challenge.question}
					</h5>
					{children}
				</Card.Title>
			</Card.Body>
		</Card>
	)
}

export default ContentCard
