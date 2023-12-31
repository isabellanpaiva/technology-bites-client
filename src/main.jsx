import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context'
import { MessageProviderWrapper } from './contexts/message.context'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<MessageProviderWrapper>
			<AuthProviderWrapper>
				<App />
			</AuthProviderWrapper>
		</MessageProviderWrapper>
	</Router>
)
