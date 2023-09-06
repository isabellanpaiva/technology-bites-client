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

	getDojoCategories() {
		return this.api.get('/getDojoCategories')
	}

	getDojoQuestions(category) {
		return this.api.get(`/getDojoQuestions/${category}`)
	}
}

const dojoServices = new DojoServices()

export default dojoServices
