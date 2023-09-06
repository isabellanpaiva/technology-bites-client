import axios from 'axios'

class DojoServices {
	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/dojo`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem('authToken')
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}
			return config
		})
	}

	getDojoInformation() {
		return this.api.get('/getDojoInformation')
	}
}

const dojoServices = new DojoServices()

export default dojoServices
