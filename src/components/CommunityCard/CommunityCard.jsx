import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CommunityCard = ({ user }) => {

    const navigate = useNavigate()

    const checkUserProfile = () => {
        navigate(`/profile/${user._id}`)
    }

    return (

        <Card className='CommunityCard'>

            <Card.Header className='CardHeader'>

                <Row>

                    <Col>

                        <img className="userAvatar mb-1" src={user.avatar} alt='ProfileAvatar' />

                        <Card.Title
                            className='CardTitle'>
                            {user.firstName} {user.lastName}
                        </Card.Title>
                    </Col>


                </Row>

            </Card.Header>

            <Card.Body className='CardBody'>

                <Card.Text className='CardText' > {user.jobPosition} </Card.Text>

                <Card.Text className='plainText' style={{ fontSize: '1.3em' }}>{user.description}</Card.Text>

            </Card.Body>

            <Card.Footer className='CardFooter'>
                <Row>
                    <Col>
                        <button className='socialActionButton' onClick={checkUserProfile}>Check</button>
                    </Col>
                    <Col>
                        <button className='socialActionButton'>Follow</button>
                    </Col>
                </Row>
            </Card.Footer>

        </Card >
    );
};

export default CommunityCard;

