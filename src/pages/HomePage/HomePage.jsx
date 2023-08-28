import { Container, Row, Col } from 'react-bootstrap'

const HomePage = () => {

    return (

        <Container className="Home">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>HomePage Test</h1>

                </Col>

            </Row>

        </Container>
    )
}

export default HomePage