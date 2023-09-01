import { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageContext } from '../../contexts/message.context'

const UserMessage = () => {
	const { toastMessage, showToast, closeToast } = useContext(MessageContext)

	return (
		<Toast
			onClose={closeToast}
			show={showToast}
			delay={3000}
			autohide
			style={{ position: 'fixed', top: 130, right: 30, zIndex: 30 }}>
			<Toast.Header closeButton={false}>
				<strong className='me-auto'>Bite Team</strong>
			</Toast.Header>
			<Toast.Body>{toastMessage}</Toast.Body>
		</Toast>
	)
}

export default UserMessage
