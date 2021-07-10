import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'e8f73930-2dad-4e43-b9a0-3637f9a68788'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },
    ubfollow(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },
    getProfile(userId) {
        console.warn("Obsolete method. Please profileAPI object.")
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`Profile/` + userId);
    },
    getStatus(userId) {
        return instance.get(`Profile/Status/` + userId);
    },
    updateStatus(status) {
        return instance.put(`Profile/Status`, { status: status });
    }
}

export const authAPI = {
    me() {
        return instance.get('auth/me');
    },
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe});
    },
    logout() {
        return instance.delete('auth/login')
    }
}

