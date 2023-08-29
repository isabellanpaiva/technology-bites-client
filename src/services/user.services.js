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
        return this.api.get(`/getOne/${user_id}`)
    }
    deleteUser(user_id) {
        return this.api.delete(`/delete/${user_id}`)
    }
    editUser(user_id, userData) {
        return this.api.put(`/edit/${user_id}`, userData)
    }
    updateFavorites(action, friend_id) {
        return this.api.post(`/edit/${action}`, friend_id)
    }
}

const userService = new UserService()

export default userService








