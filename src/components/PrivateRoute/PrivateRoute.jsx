import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from '../../contexts/message.context'
import { Col, Row } from 'react-bootstrap'

const PrivateRoute = () => {
	const { loggedUser, isLoading } = useContext(AuthContext)
	const { emitMessage } = useContext(MessageContext)
	if (isLoading) {
		return (
			<Row className='justify-content-center'>
				<Col md={{ span: 1 }}>
					<Spinner
						style={{ margin: '0 auto' }}
						animation='border'
						size='md'
						role='status'
					/>
				</Col>
			</Row>
		)
	}

	if (!loggedUser) {
		emitMessage('Ops! Please log in to continue')
		console.clear()
		return (
			<>
				<Navigate to='/' />
			</>
		)
	}

	return <Outlet />
}

export default PrivateRoute
