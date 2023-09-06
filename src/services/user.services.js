import axios from 'axios'

class UserService {
	constructor() {
		this.api = axios.create({
			baseURL: `${import.meta.env.VITE_API_URL}/user`,
		})
		this.api.interceptors.request.use(config => {
			const storedToken = localStorage.getItem('authToken')
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` }
			}
			return config
		})
	}
	getOneUser(user_id) {
		return this.api.get(`/getOneUser/${user_id}`)
	}

	getAllUsers(filter) {
		return this.api.get(`/getAllUsers/${filter}`)
	}

	deleteUser(user_id) {
		return this.api.delete(`/deleteUser/${user_id}`)
	}

	editUser(user_id, userData) {
		return this.api.put(`/editUser/${user_id}`, userData)
	}

	updateFollowers(follower_id, action) {
		return this.api.post(`/updateFollowers/${action}`, { follower_id })
	}
}

const userService = new UserService()

export default userService
