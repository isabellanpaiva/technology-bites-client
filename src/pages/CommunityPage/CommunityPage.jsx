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
			<Col key={i} xs={1} className='d-flex justify-content-center'>
				<button className='categoryTag m-1' onClick={() => loadCommunityDetails(i)}>
					{i + 1}
				</button>
			</Col>
		)
	}

	return (
		<>
			<Container fluid>
				<section className='section-header'>
					<h1 className='PageHeading'>Community</h1>
					<h3 className='PageSubHeading'>Meet your neighbors </h3>
				</section>
				<Form
					className='mb-4'
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Form.Check
						type='checkbox'
						id='custom-switch'
						label='Only people I follow'
						onChange={handleCheck}
					/>
				</Form>
				<Row className='mx-5'>
					{users.length > 0 &&
						users.map(user => (
							<Col
								key={user._id}
								md={{ span: 6 }}
								xl={{ span: 4 }}
								style={{ padding: '1em' }}>
								<CommunityCard
									user={user}
									loadCommunityDetails={loadCommunityDetails}
								/>
							</Col>
						))}
				</Row>
				<Container>
					<Row className='justify-content-center mt-4'>{buttons}</Row>
				</Container>
			</Container>
		</>
	)
}

export default CommunityPage
