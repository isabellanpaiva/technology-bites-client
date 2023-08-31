import { Container, Row, Col } from 'react-bootstrap'
import ContentCard from './../../components/ContentCard/ContentCard'

const HomePage = () => {

	const appName = import.meta.env.VITE_APP_NAME

	// states and services goes here

	return (

		<Container className='Home'>

			<Row>
				<Col md={{ span: 8, offset: 2 }}>

					<section>

						<h1>{appName}</h1>

						<h3>Explanation about what we do</h3>

						<ContentCard>
							{/* states props goes here */}
						</ContentCard>

					</section>

				</Col>
			</Row>

		</Container >

	)

}

export default HomePage
