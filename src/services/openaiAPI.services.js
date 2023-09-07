import axios from 'axios'

class OpenAIAPiServices {
	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/openai`,
		})
	}

	generateResponse(user_response, question) {
		return this.api.post('/generateResponse', { user_response, question })
	}
}

const openaiAPIServices = new OpenAIAPiServices()

export default openaiAPIServices
