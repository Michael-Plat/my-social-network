import { UsersType } from './../types/types';
import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '3666f275-7626-4523-984f-0cc5ddcb5a8c'
    }
});

type FollowUfollowResponseType = {
    data: {
        userId: number
    }
    resultCode: ResuitCodesEnum 
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data);
    },
    follow(id: number) {
        return instance.post<FollowUfollowResponseType>(`follow/${id}`).then(res => res.data);
    },
    unfollow(id: number) {
        return instance.delete<FollowUfollowResponseType>(`follow/${id}`).then(res => res.data);
    },
    getProfile(userId: number) {
        console.warn("Obsolete method. Please profileAPI object.")
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`Profile/` + userId).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get(`Profile/Status/` + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        return instance.put(`Profile/Status`, { status: status }).then(res => res.data);
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`Profile/Photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put(`Profile`, profile).then(res => res.data);
    }
};

export enum ResuitCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResuitCodeForCaptchaEnum {
    CaptchaIsRecvired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResuitCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResuitCodesEnum | ResuitCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me').then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    logout() {
        return instance.delete<LoginResponseType>('auth/login').then(res => res.data)
    }
};

type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url').then(res => res.data);
    }
};

