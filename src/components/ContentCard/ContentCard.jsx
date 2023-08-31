import './ContentCard.css'
import { Button, Card } from 'react-bootstrap'

const ContentCard = ({ bites, children, fireFinalActions }) => {

    return (

        <Card className="ContentCard">

            <Card.Body>

                {/* bite: concept / challenge: question / dojo: concept */}
                <Card.Title className="CardTitle">
                    {bites.category}
                </Card.Title>

                {/* bite: random bite / challenge: submit user response / dojo: true or false */}
                <Card.Text className="CardText">

                    {children}

                    <Button variant="dark" className="CardButton" onClick={fireFinalActions}>
                        Get another bite
                    </Button>

                </Card.Text>

            </Card.Body>

        </Card>

    )
}

export default ContentCard