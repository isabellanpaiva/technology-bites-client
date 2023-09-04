import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CommunityCard = ({ user }) => {

    const navigate = useNavigate()

    const checkUserProfile = () => {
        // alert("Button clicked")
        console.log(user.id)
        navigate(`/profile/${user.id}`)
    }

    return (
        <Card className='CommunityCard'>
            <Card.Header className='CardHeader'>
                <Row>
                    <Col>
                        <img src={user.avatar} alt='ProfileAvatar' className='mb-1' />
                    </Col>
                </Row>
            </Card.Header>

            <Card.Body className='CardBody'>
                <Col>
                    <Card.Title
                        className='CardTitle'
                        style={{ marginBottom: '-1rem' }}>
                        {user.firstName} {user.lastName}
                    </Card.Title>
                    <Card.Text
                        className='CardText'
                        style={{ marginBottom: '0rem', color: 'grey' }}>
                        <strong>{user.jobPosition} </strong>
                    </Card.Text>
                    <Card.Text className='CardText'>{user.description}</Card.Text>
                </Col>
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
        </Card>
    );
};

export default CommunityCard;

