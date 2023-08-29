import { Container, Row, Col, Button } from 'react-bootstrap'
import ProfileInfo from './../../components/ProfileInfo/ProfileInfo'

const ProfilePage = () => {

    return (

        <Container className="ProfilePage">

            <Row>

                <Col md={{ span: 8, offset: 2 }}>

                    <ProfileInfo />

                </Col>

            </Row>

        </Container>
    )
}

export default ProfilePage