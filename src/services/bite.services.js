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

	createOne(biteData) {
		return this.api.post('/create', biteData)
	}

	createMany(bitesJson) {
		return this.api.post('/createMany', bitesJson)
	}

	getOneRandom() {
		return this.api.get('/getOneRandom')
	}
}

const biteServices = new BiteServices()

export default biteServices
