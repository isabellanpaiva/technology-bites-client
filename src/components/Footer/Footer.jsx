import './Footer.css'
import logo from './../../../public/test-logo.png'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {

    return (

        <footer className="Footer">

            <Row>

                <Col md={{ span: 10 }}>

                    <h1>Contact </h1>

                    <p> Want to work together? </p>

                    <p className="FooterEmail">
                        Write us at
                        technologybites.hi@gmail.com
                    </p>

                </Col>

                <Col md={{ span: 2 }}>

                    <img src={logo} alt="logo" />

                </Col>

            </Row>

        </footer >

    )

}

export default Footer