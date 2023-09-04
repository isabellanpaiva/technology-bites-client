import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import userService from '../../services/user.services'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import { AuthContext } from './../../contexts/auth.context'

const CommunityPage = () => {
	const { loggedUser } = useContext(AuthContext)

	const [users, setUsers] = useState([])

	useEffect(() => {
		loadCommunityDetails()
	}, [])

	const loadCommunityDetails = () => {
		userService
			.getAllUsers()
			.then(({ data }) => {
				const communityUsers = data.filter(user => user._id !== loggedUser._id)
				setUsers(communityUsers)
			})
			.catch(err => console.log(err))
	}

	//call service updateFavorites

	return (
		<>
			<Container fluid className='PageContainer'>
				<section style={{ marginBottom: '5em' }}>
					<h1 className='PageHeading' style={{ fontSize: '3em' }}>
						{' '}
						Community{' '}
					</h1>

					<h3 className='PageSubHeading'>Meet your neighbors </h3>
				</section>

				<Row>
					{users.map(user => (
						<Col key={user._id} md={{ span: 4 }}>
							{/* <Col key={user.id} md={4}> */}
							<CommunityCard user={user} />
						</Col>
					))}
				</Row>
			</Container>
		</>
	)
}

export default CommunityPage
