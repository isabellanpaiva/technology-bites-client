import './../../App.css'
import { Card } from 'react-bootstrap'

const DojoCard = () => {

    return (

        <Card className='DojoCard'>

            <Card.Body>

                {/* replace by dojo question */}

                <Card.Title>
                    <h3
                        className='PageSubHeading mb-4'
                        style={{ color: 'black' }}
                    >
                        Dojo question
                    </h3>
                </Card.Title>

                {/* replace by dojo question */}

                {/* add buttons here */}

                <Card.Title>
                    <h4 className='PageSubHeading mt-0' style={{ lineHeight: '2' }}> true or false</h4>

                </Card.Title>

                {/* add buttons here */}

            </Card.Body>

        </Card>
    )
}

export default DojoCard