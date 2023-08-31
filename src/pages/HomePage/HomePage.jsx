import { Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap'

const HomePage = () => {
	return (
		<>
			<Container className='Home'>
				<Row>
					<Col md={{ span: 8, offset: 2 }}>
						<h1>HomePage Test</h1>
					</Col>
				</Row>
			</Container>

			{/* <ToastContainer position='top-end' style={{ paddingTop: '80px', paddingRight: '20px' }}>
				<Toast>
					<Toast.Header>
						<strong className='me-auto'>TechBites</strong>
					</Toast.Header>
					<Toast.Body>Logged in successfully!</Toast.Body>
				</Toast>
			</ToastContainer> */}
		</>
	)
}

export default HomePage
