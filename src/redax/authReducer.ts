import { ResuitCodeForCaptchaEnum } from './../api/Api';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { stopSubmit } from "redux-form";
import { authAPI, ResuitCodesEnum, securityAPI } from "../api/Api";

const SET_USER_DATA = 'my-social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCES = 'my-social-network/auth/GET_CAPTCHA_URL_SUCCES';

type InitialStateType = typeof initialState

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required. 
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCES:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

export type SetAuthUserDataPayloadActionType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadActionType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
    ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCES,
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>
    ({ type: GET_CAPTCHA_URL_SUCCES, payload: { captchaUrl } });

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const getAuthUserDate = () => async (dispatch: DispatchType) => {
    const meData = await authAPI.me();
    if (meData.resultCode === ResuitCodesEnum.Success) {
        const { id, email, login } = meData.data

        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResuitCodesEnum.Success) {
        dispatch(getAuthUserDate())
    } else {
        if (loginData.resultCode === ResuitCodeForCaptchaEnum.CaptchaIsRecvired) {
            dispatch(getCaptchaUrl());
        }
        let message = loginData.messages.length > 0 ? loginData .messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
}
export const logout = () => async (dispatch: DispatchType) => {
    const logoutData = await authAPI.logout()
    if (logoutData.resultCode === ResuitCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = () => async (dispatch: DispatchType) => {
    const captchaData = await securityAPI.getCaptchaUrl();
    const captchaUrl = captchaData.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;