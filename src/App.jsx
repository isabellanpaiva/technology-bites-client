import './App.css'
import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer/Footer'
import UserMessage from './components/UsserMessage/UserMessage'

function App() {
	return (
		<div className={'App'}>
			<Navigation />
			<AppRoutes />
			<Footer />
			<UserMessage />
		</div>
	)
}

export default App
