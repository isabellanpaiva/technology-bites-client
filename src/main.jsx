import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<AuthProviderWrapper>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</AuthProviderWrapper>
	</Router>
)
