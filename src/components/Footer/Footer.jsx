import './Footer.css'
import logo from './../../../public/logo.png'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<footer className='Footer'>
			<Row sm={{ justifyContent: 'center' }}>
				<Col md={{ span: 9 }}>
					<h1>Contact </h1>
					<p> Want to work together? </p>
					<p className='FooterEmail'>Write us at technologybites.hi@gmail.com</p>
				</Col>

				<Col md={{ span: 3 }} className='d-flex justify-content-center'>
					<img className='logo' src={logo} alt='logo' />
				</Col>
			</Row>
		</footer>
	)
}

export default Footer
