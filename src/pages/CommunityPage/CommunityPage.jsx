import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import userService from '../../services/user.services'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import { AuthContext } from './../../contexts/auth.context'

const CommunityPage = () => {
	const { loggedUser } = useContext(AuthContext)

	const [users, setUsers] = useState([])
	const [errors, setErrors] = useState([])
	const [filter, setFilter] = useState(false)

	useEffect(() => {
		loadCommunityDetails()
	}, [filter])

	const handleCheck = e => {
		setFilter(e.target.checked)
	}

	const loadCommunityDetails = () => {
		userService
			.getAllUsers(filter)
			.then(({ data }) => {
				const communityUsers = data.filter(user => user._id !== loggedUser._id)
				setUsers(communityUsers)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	return (
		<>
			<Container fluid className='PageContainer'>
				<section style={{ marginBottom: '5em' }}>
					<h1 className='PageHeading' style={{ fontSize: '3em' }}>
						Community
					</h1>

					<h3 className='PageSubHeading'>Meet your neighbors </h3>
				</section>
				<Form>
					<Form.Check
						type='checkbox'
						id='custom-switch'
						label='Only Following'
						onChange={handleCheck}
					/>
				</Form>
				<Row>
					{users.map(user => (
						<Col key={user._id} md={{ span: 4 }}>
							<CommunityCard
								user={user}
								loadCommunityDetails={loadCommunityDetails}
							/>
						</Col>
					))}
				</Row>
			</Container>
		</>
	)
}

export default CommunityPage
