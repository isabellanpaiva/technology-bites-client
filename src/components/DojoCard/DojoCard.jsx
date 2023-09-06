import './../../App.css'
import { Card, Row } from 'react-bootstrap'

const DojoCard = () => {

    return (

        <Card className='ContentCard'>

            <Card.Body>

                <Card.Title>
                    <h3
                        className='PageSubHeading mb-4'
                        style={{ color: 'black' }}
                    >
                        {/* replace by dojo question */}
                        Dojo question
                    </h3>
                </Card.Title>

                {/* add buttons here */}

                <Card.Title>

                    <Row>
                        {/* add buttons here */}
                        <h4 className='PageSubHeading mt-0' style={{ lineHeight: '2' }}> true</h4>
                        <h4 className='PageSubHeading mt-0' style={{ lineHeight: '2' }}> false</h4>
                    </Row>

                </Card.Title>

            </Card.Body>

        </Card>
    )
}

export default DojoCard