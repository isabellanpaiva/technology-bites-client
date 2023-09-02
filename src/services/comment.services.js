import axios from 'axios'

class CommentServices {

	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/comment`,
		})

		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem('authToken')
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}
			return config
		})
	}

	createComment(commentData) {
		return this.api.post('/createComment', commentData)
	}

	getAllComments(challenge_id) {
		return this.api.get('/getAllComments', challenge_id)
	}

	editComment(commentData, comment_id) {
		return this.api.put(`/editComment/${comment_id}`, commentData)
	}

	deleteComment(comment_id) {
		return this.api.delete(`/deleteComment/${comment_id}`)
	}

}

const commentServices = new CommentServices()

export default commentServices
