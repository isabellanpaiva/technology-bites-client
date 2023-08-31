import './ContentCard.css'
import { Button, Card } from 'react-bootstrap'

const ContentCard = ({ children }) => {

    // home add props 

    return (

        <>
            <br></br>

            <Card className="text-center">

                <Card.Body>

                    <Card.Title>
                        {/* bite: concept / challenge: question / dojo: concept */}
                        {/* Sample: Internet */}
                    </Card.Title>


                    <Card.Text>
                        {/* bite: definition / challenge: placehold for user response / dojo: question */}
                        {/* Sample: The global network of connected computers and servers that enables communication, information sharing, and access to online resources. */}
                    </Card.Text>


                    <Button variant="primary">
                        {/* bite: random bite / challenge: submit user response / dojo: true or false */}
                        {/* Sample: Get another bite */}
                    </Button>


                </Card.Body>

            </Card>

        </>

    )
}

export default ContentCard