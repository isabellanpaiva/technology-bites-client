import './CommentCard.css'
import { Card, Row, Col } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'

const CommentsCard = () => {

    return (

        <Card className="ContentCard" style={{ width: '85%' }}>

            <Row>

                <Col md={{ span: 3 }}>

                    <Card.Header className="CardHeader">

                        <img src={testImage} alt="ProfileAvatar" className="CommentAvatar mb-4" style={{ width: '50%', height: 'auto' }} />
                        <h5 style={{ fontSize: '0.75em' }}>Isabella Paiva</h5>

                    </Card.Header>

                </Col>

                <Col md={{ span: 9 }}>

                    <Card.Body className="CardBody" style={{ fontSize: '0.8em' }}>

                        <Col>

                            <Card.Text className="CardText">

                                "This is super cool! Thank you for sharing time and vision with me. I agree 100% and think that you should get a raise. Let mer call your boss!"

                            </Card.Text>

                        </Col>

                    </Card.Body>

                </Col>

            </Row >

        </Card >


    )

}

export default CommentsCard