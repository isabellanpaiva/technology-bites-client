import Alert from 'react-bootstrap/Alert'

const FormError = ({ children }) => {
	return <Alert variant={'danger'}>{children}</Alert>
}

export default FormError
