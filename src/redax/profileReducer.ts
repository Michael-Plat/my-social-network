import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { ResuitCodesEnum } from '../api/api';
import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostsType, ProfileType } from "../types/types";
import { profileAPI } from '../api/profile-api';

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", numberLike: 15 },
        { id: 2, message: 'It\' s my fist post', numberLike: 20 },
        { id: 3, message: 'Nothing is clear, but very interesting! )', numberLike: 34 },
        { id: 4, message: 'YO', numberLike: 5 },
        { id: 5, message: 'My fist post', numberLike: 2 }
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ""
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'MSN/PROFILE/ADD-POST': {
            let newPost = {
                id: 6,
                message: action.newPostBody,
                numberLike: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case 'MSN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'MSN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'MSN/PROFILE/DELETE_POST': {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        }
        case 'MSN/PROFILE/SAVE_PHOTO_SUCCESS':
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        default:
            return state;
    }
};

export const actions = {

    addPostActionCreator: (newPostBody: string) => ({ type: 'MSN/PROFILE/ADD-POST', newPostBody } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'MSN/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'MSN/PROFILE/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'MSN/PROFILE/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'MSN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)

}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {

    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {

    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResuitCodesEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResuitCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResuitCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
};

export default profileReducer

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>