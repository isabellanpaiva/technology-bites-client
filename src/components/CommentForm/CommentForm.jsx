import { Card, Row, Col, FloatingLabel, Form } from 'react-bootstrap'

const CommentForm = () => {

    return (

        <Card className="mt-" style={{ border: 'none' }}>

            <Card.Header className="CardHeader" style={{ padding: '3em' }}>

                <FloatingLabel controlId="floatingTextarea2" label="Have something to say about this response?">
                    <Form.Control as="textarea" placeholder="userComment" style={{ height: '7.5em' }} />
                </FloatingLabel>

                <button className="socialActionButton" style={{ fontSize: '1em' }}>
                    Publish
                </button>

            </Card.Header>

        </Card >

    )

}

export default CommentForm