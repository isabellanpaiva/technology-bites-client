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

	getOneChallenge(challenge_id) {
		return this.api.get(`/getOneChallenge/${challenge_id}`)
	}

	getOneRandomChallenge() {
		return this.api.get('/getOneRandomChallenge')
	}

	getDailyChallenge() {
		return this.api.get('/getDailyChallenge')
	}

	getChallengeResponses(challenge_id) {
		console.log('oooooooo', challenge_id)
		return this.api.get(`/getChallengeResponses/${challenge_id}`)
	}

	saveResponse(challenge_id, response_id) {
		return this.api.post(`/saveResponse/${challenge_id}`, { response_id })
	}
}

const challengeServices = new ChallengeServices()

export default challengeServices
