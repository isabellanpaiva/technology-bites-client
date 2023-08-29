import { createContext, useEffect, useState } from 'react'
import authService from './../services/auth.services'

const AuthContext = createContext()

function AuthProviderWrapper(props) {
	const [loggedUser, setLoggedUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const authenticateUser = () => {
		const token = localStorage.getItem('authToken')

		if (token) {
			authService
				.verify(localStorage.getItem('authToken'))
				.then(response => {
					setLoggedUser(response.data.loggedUser)
					setIsLoading(false)
				})
				.catch(() => {
					setLoggedUser(null)
					setIsLoading(false)
				})
		} else {
			logout()
		}
	}

	const logout = () => {
		setLoggedUser(null)
		setIsLoading(false)
		localStorage.removeItem('authToken')
	}

	const storeToken = authToken => localStorage.setItem('authToken', authToken)

	useEffect(() => {
		authenticateUser()
	}, [])

	return (
		<AuthContext.Provider
			value={{ loggedUser, authenticateUser, logout, storeToken, isLoading }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProviderWrapper }
