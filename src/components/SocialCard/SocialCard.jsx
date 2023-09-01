import './SocialCard.css'
import { Card, Row, Col } from 'react-bootstrap'
import testImage from './../../../public/testImage.jpg'
import CommentsCard from './../CommentsCard/CommentsCard'

const SocialCard = () => {

    return (

        <>

            <Card className="ContentCard">

                {/* remove if its your profile page */}

                <Card.Header className="CardHeader">

                    <img src={testImage} alt="ProfileAvatar" className="mb-4" />
                    <h5>Isabella Paiva</h5>

                </Card.Header>

                {/* remove if its your profile page */}

                <Card.Body className="CardBody">

                    <Col>

                        <Card.Title className="CardTitle">
                            <div> What is internet and how do you use it? </div>
                        </Card.Title>

                        <Card.Text className="CardText">

                            <div> "Internet is a really cool place where you can read, write, hear and play a lot of things and make new friends and forget to reply your old friends and buy other things and this kind of stuff " </div>

                        </Card.Text>

                    </Col>

                </Card.Body>

                <Card.Footer className="CardFooter">
                    <Row>
                        <Col>
                            <div>Icon 1</div>
                        </Col>
                        <Col>
                            <div>Icon 2</div>
                        </Col>
                    </Row>
                </Card.Footer>

            </Card >

            {/* comments card test */}

            <CommentsCard />

            {/* comments card test */}

        </>

    )
}

export default SocialCard
