import axios from 'axios'

class ChallengeServices {
	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/challenge`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem('authToken')
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}
			return config
		})
	}

	createOneChallenge(challengeData) {
		return this.api.post('/createChallenge', challengeData)
	}

	createManyChallenge(challengeJson) {
		return this.api.post('/createManyChallenge', challengeJson)
	}

	//in progress

	getOneChallenge(challenge_id) {
		return this.api.get(`/getOneChallenge/${challenge_id}`)
	}

	//in progress

	getOneRandomChallenge() {
		return this.api.get('/getOneRandomChallenge')
	}

	saveResponse(responseInfo) {
		return this.api.put('/saveResponse', responseInfo)
	}

}

const challengeServices = new ChallengeServices()

export default challengeServices
