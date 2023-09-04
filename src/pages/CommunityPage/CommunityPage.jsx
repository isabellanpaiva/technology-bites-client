import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import userService from '../../services/user.services'
import CommunityCard from '../../components/CommunityCard/CommunityCard'

const CommunityPage = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadCommunityDetails()
    }, [])

    const loadCommunityDetails = () => {

        userService
            .getAllUsers()
            .then(({ data }) => setUsers(data))
            .catch(err => console.log(err))
    }

    return (

        <>

            <Container fluid className="PageContainer">

                <section style={{ marginBottom: '5em' }}>

                    <h1 className='PageHeading' style={{ fontSize: '3em' }}> Community </h1>

                    <h3 className='PageSubHeading'>Check who's around </h3>

                </section>

                <Row>
                    {users.map(user => (
                        <Col key={user.id} md={{ span: 4 }}>
                            {/* <Col key={user.id} md={4}> */}
                            <CommunityCard user={user} />
                        </Col>
                    ))}
                </Row>

            </Container >

        </>
    )
}

export default CommunityPage