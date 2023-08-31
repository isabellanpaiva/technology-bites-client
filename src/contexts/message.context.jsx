import { createContext, useState } from 'react'

const MessageContext = createContext()

function MessageProviderWrapper(props) {
	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('AIUDA PORFAVÓ')

	const emitMessage = text => {
		setToastMessage(text)
		setShowToast(true)
	}

	const closeToast = () => setShowToast(false)

	return (
		<MessageContext.Provider value={{ toastMessage, showToast, closeToast, emitMessage }}>
			{props.children}
		</MessageContext.Provider>
	)
}

export { MessageContext, MessageProviderWrapper }
