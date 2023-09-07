import { useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import userService from '../../services/user.services'
import CommunityCard from '../../components/CommunityCard/CommunityCard'
import { AuthContext } from './../../contexts/auth.context'

const CommunityPage = () => {
	const { loggedUser } = useContext(AuthContext)

	const [users, setUsers] = useState([])
	const [totalUsers, setTotalUsers] = useState(0)
	const [errors, setErrors] = useState([])
	const [filter, setFilter] = useState(false)

	useEffect(() => {
		loadCommunityDetails()
	}, [filter])

	const handleCheck = e => {
		setFilter(e.target.checked)
	}

	const loadCommunityDetails = page => {
		page ??= 0
		userService
			.getTotalUsers(filter)
			.then(({ data }) => {
				setTotalUsers(data)
			})
			.catch(err => setErrors(err.response.data.errorMessages))

		userService
			.getAllUsers(filter, page)
			.then(({ data }) => {
				setUsers(data)
			})
			.catch(err => setErrors(err.response.data.errorMessages))
	}

	let buttons = []

	for (let i = 0; i < totalUsers / 6; i++) {
		buttons.push(
			<Col md={{ span: 1 }} key={i}>
				<button
					className='categoryTag'
					style={{ marginRight: '1em' }}
					onClick={() => loadCommunityDetails(i)}>
					{i + 1}
				</button>
			</Col>
		)
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

				<Form
					className='CardTitle'
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Form.Check
						type='checkbox'
						id='custom-switch'
						label='People I follow'
						onChange={handleCheck}
					/>
				</Form>

				<Row>
					{users.length > 0 &&
						users.map(user => (
							<Col key={user._id} md={{ span: 4 }}>
								<CommunityCard
									user={user}
									loadCommunityDetails={loadCommunityDetails}
								/>
							</Col>
						))}
				</Row>
				<Container>
					<Row className='justify-content-center' style={{ marginTop: '2.5em' }}>
						{buttons}
					</Row>
				</Container>
			</Container>
		</>
	)
}

export default CommunityPage
