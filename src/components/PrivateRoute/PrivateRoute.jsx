import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from '../../contexts/message.context'

const PrivateRoute = () => {
	const { loggedUser, isLoading } = useContext(AuthContext)
	const { emitMessage } = useContext(MessageContext)

	if (isLoading) {
		return <Spinner animation='border' size='sm' role='status' />
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
