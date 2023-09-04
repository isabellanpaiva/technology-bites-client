import axios from 'axios'

class ResponseService {
	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/response`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem('authToken')
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}
			return config
		})
	}

	createOneResponse(responseInfo) {
		return this.api.post('/createOneResponse', responseInfo)
	}

	getUserResponses(user_id) {
		return this.api.get(`/getUserResponses/${user_id}`)
	}

	getUserResponsesToChallenge(user_id, challenge_id) {
		return this.api.get(`/getUserResponsesToChallenge/${challenge_id}/${user_id}`)
	}

	getResponsesToChallenge(challenge_id) {
		return this.api.get(`/getResponsesToChallenge/${challenge_id}`)
	}
}

const responseService = new ResponseService()

export default responseService
