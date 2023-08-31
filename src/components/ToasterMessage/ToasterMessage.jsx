import { Toast, ToastContainer } from 'react-bootstrap'

const ToasterMessage = () => {

    return (
        <ToastContainer position='top-end' style={{ paddingTop: '80px', paddingRight: '20px' }}>
            <Toast>
                <Toast.Header>
                    <strong className='me-auto'>TechBites</strong>
                </Toast.Header>
                <Toast.Body>Logged in successfully!</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToasterMessage
