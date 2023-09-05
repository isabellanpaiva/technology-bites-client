import { Card, Row, Col, FloatingLabel, Form } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'

const CommentsCard = () => {

    return (

        <Card className="ContentCard" style={{ width: '60%', fontSize: '0.85em' }}>

            {/* <Card.Header className="CardHeader" style={{ fontSize: '1em' }}>

                <FloatingLabel controlId="floatingTextarea2" label="Have something to say?">

                    <Form.Control as="textarea" placeholder="Have something to say?" style={{ height: '7.5em' }}
                    />

                </FloatingLabel>

                <div className="mt-3 me-2" style={{ fontSize: '1em', color: 'black', textAlign: 'right' }}>
                    <strong>Publish</strong>
                </div>


            </Card.Header> */}

            <Card.Body className="CardBody ms-5" >

                <Row className="mt-5 mb-5">

                    <Col md={{ span: 2 }} >

                        <div>
                            <img className="userAvatar" src={testImage} alt="ProfileAvatar" style={{ width: '140%', height: '10em' }} />
                        </div>

                        <div className="mt-2 ms-4">
                            <strong>Isabella</strong>
                        </div>

                    </Col>

                    <Col md={{ span: 10 }}>

                        <Card.Text className="CardText">
                            "This is super cool! Thank you for sharing time and vision with me. I agree 100% and think that you should get a raise. Let mer call your boss!"
                        </Card.Text>

                        {/* add conditional rendering */}

                        <div>

                            <strong>Edit</strong> <strong>Delete</strong>

                        </div>

                    </Col>

                </Row>

                {/* second commentary for testing */}

                <Row>

                    <Col md={{ span: 2 }} >

                        <div>
                            <img className="userAvatar" src={testImage} alt="ProfileAvatar" style={{ width: '140%', height: '10em' }} />
                        </div>

                        <div className="mt-2 ms-4">
                            <strong>Isabella</strong>
                        </div>

                    </Col>

                    <Col md={{ span: 10 }}>

                        <Card.Text className="CardText">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum, arcu nec lacinia ullamcorper, ipsum urna varius ligula."
                        </Card.Text>

                        {/* add conditional rendering */}

                        <div>

                            <strong>Edit</strong> <strong>Delete</strong>

                        </div>

                    </Col>

                </Row>

            </Card.Body>

        </Card >


    )

}

export default CommentsCard