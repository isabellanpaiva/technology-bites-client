import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {

    return (

        <Container className="NotFoundPage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>Ops... 404</h1>
                    <hr />
                    <p>Page not found</p>

                </Col>

            </Row>

        </Container>
    )
}

export default NotFoundPage