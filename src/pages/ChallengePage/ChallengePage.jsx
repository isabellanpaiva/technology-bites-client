import { Container, Row, Col, Button } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'

const ChallengePage = () => {

    // states and services goes here

    return (

        <Container className="ChallengesPage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <h1>ChallengesPage Test</h1>

                    {/* <ContentCard /> */}

                </Col>

            </Row>

        </Container>
    )
}

export default ChallengePage