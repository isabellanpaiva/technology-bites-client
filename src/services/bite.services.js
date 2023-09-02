import axios from 'axios'

class BiteServices {
	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/bite`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem('authToken')
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}
			return config
		})
	}

	createOneBite(biteData) {
		return this.api.post('/createOneBite', biteData)
	}

	createManyBites(bitesJson) {
		return this.api.post('/createManyBites', bitesJson)
	}

	getOneRandomBite() {
		return this.api.get('/getOneRandomBite')
	}
}

const biteServices = new BiteServices()

export default biteServices
