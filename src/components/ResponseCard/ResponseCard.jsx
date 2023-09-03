import { Card, Row, Col, Accordion } from 'react-bootstrap';
import testImage from './../../../public/testImage.jpg'
import CommentCardNested from '../CommentCard/CommentCard-nested'
import { useState } from 'react'

const ResponseCard = () => {

    return (

        <Card className="ContentCard">
            {/* remove if it's your profile page */}
            <Card.Header className="CardHeader">
                <img src={testImage} alt="ProfileAvatar" className="mb-4" />
                <h5>Isabella Paiva</h5>
            </Card.Header>

            {/* remove if it's your profile page */}
            <Card.Body className="CardBody">
                <Col>
                    <Card.Title className="CardTitle">
                        <h3>What is the internet and how do you use it?</h3>
                    </Card.Title>
                    <Card.Text className="CardText">
                        "Internet is a really cool place where you can read, write, hear, and play a lot of things, make new friends, forget to reply to your old friends, buy other things, and do this kind of stuff."
                    </Card.Text>
                </Col>
            </Card.Body>

            <Card.Footer className="CardFooter">

                <Row>
                    <Col>
                        <button className="socialActionButton">
                            Like
                        </button>
                    </Col>

                    {/* this needs to trigger the commentCard */}
                    <Col>
                        <button className="socialActionButton">
                            Comment
                        </button>
                    </Col>
                    {/* this needs to trigger the commentCard */}

                </Row>

            </Card.Footer>

            <CommentCardNested />

        </Card>

    )

}

export default ResponseCard
