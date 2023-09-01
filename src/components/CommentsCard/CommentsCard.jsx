import './CommentsCard.css'
import { Card, Row, Col } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'

const CommentsCard = () => {

    return (

        <Card className="ContentCard" >

            <Row>

                <Col md={{ span: 4 }}>

                    <Card.Header className="CardHeader">

                        <img src={testImage} alt="ProfileAvatar" className="mb-4" />
                        <h5 style={{ fontSize: '1em' }}>Isabella Paiva</h5>

                    </Card.Header>

                </Col>

                <Col md={{ span: 8 }}>

                    <Card.Body className="CardBody" style={{ fontSize: '0.85em' }}>

                        <Col>

                            <Card.Text className="CardText">

                                <div> "This is super cool! Thank you for sharing time and vision with me. I agree 100% and think that you should get a raise. Let mer call your boss!" </div>

                            </Card.Text>

                        </Col>

                    </Card.Body>

                </Col>

            </Row >

        </Card >


    )

}

export default CommentsCard