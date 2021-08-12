import axios from "axios";
import { UsersType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '3666f275-7626-4523-984f-0cc5ddcb5a8c'
    }
});

export enum ResuitCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResuitCodeForCaptchaEnum {
    CaptchaIsRecvired = 10
}

export type APIResponseType<D = {}, RC = ResuitCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}
