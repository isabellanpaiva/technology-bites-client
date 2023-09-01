import axios from 'axios'

class ChallengeServices {
	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/challenge`,
		})
		this.api.interceptors.request.use(config => {
			const password = 'FORM RESPONSE' //add form response
			if (password) {
				config.headers = { Authorization: `Basic ${password}` }
			}
			return config
		})
	}

	createOne(challengeData) {
		return this.api.post('/create', challengeData)
	}

	createMany(challengeJson) {
		return this.api.post('/createMany', challengeJson)
	}

	getOneRandom() {
		return this.api.get('/getOneRandom')
	}
}

const challengeServices = new ChallengeServices()

export default challengeServices
