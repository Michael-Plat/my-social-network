import { ResuitCodeForCaptchaEnum } from '../api/api';
import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { FormAction, stopSubmit } from "redux-form";
import { ResuitCodesEnum } from "../api/api";
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required. 
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case 'MSN/AUTH/SET_USER_DATA':
        case 'MSN/AUTH/GET_CAPTCHA_URL_SUCCES':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'MSN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({ type: 'MSN/AUTH/GET_CAPTCHA_URL_SUCCES', payload: { captchaUrl } } as const)
}

export const getAuthUserDate = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
    if (meData.resultCode === ResuitCodesEnum.Success) {
        const { id, email, login } = meData.data

        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResuitCodesEnum.Success) {
        dispatch(getAuthUserDate())
    } else {
        if (loginData.resultCode === ResuitCodeForCaptchaEnum.CaptchaIsRecvired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    const logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResuitCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaData = await securityAPI.getCaptchaUrl()
    const captchaUrl = captchaData.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>