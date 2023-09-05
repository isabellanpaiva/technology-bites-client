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

	createComment(commentInfo) {
		return this.api.post('/createComment', { commentInfo })
	}

	getAllComments(response_id) {
		return this.api.get(`/getAllComments/${response_id}`)
	}

	editComment(comment_id, commentContent) {
		return this.api.post(`/editComment/${comment_id}`, { commentContent })
	}

	deleteComment(comment_id) {
		return this.api.delete(`/deleteComment/${comment_id}`)
	}
}

const commentServices = new CommentServices()

export default commentServices
