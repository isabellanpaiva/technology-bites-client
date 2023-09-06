import { Container, Row, Col } from 'react-bootstrap'
import DojoCard from '../../components/DojoCard/DojoCard'
import CategoryTags from '../../components/CategoryTags/CategoryTags'

const DojoPage = () => {

    return (

        <Container className="PageContainer">

            <section style={{ marginBottom: '5em' }}>
                <h1 className='PageHeading' style={{ fontSize: '3em' }}>
                    Dojo
                </h1>

                <h3 className='PageSubHeading'> Select a category and prove yourself! </h3>
            </section>

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <CategoryTags />
                    <DojoCard />

                </Col>

            </Row>

        </Container>
    )
}

export default DojoPage