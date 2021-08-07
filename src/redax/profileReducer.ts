import { Dispatch } from 'react';
import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/Api";
import { PhotosType, PostsType, ProfileType } from "../types/types";

const ADD_POST = 'my-social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'my-social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-social-network/profile/SET_STATUS';
const DELETE_POST = 'my-social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'my-social-network/profile/SAVE_PHOTO_SUCCESS';

type InitialStateType = typeof initialState

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", numberLike: 15 },
        { id: 2, message: 'It\' s my fist post', numberLike: 20 },
        { id: 3, message: 'Nothing is clear, but very interesting! )', numberLike: 34 },
        { id: 4, message: 'YO', numberLike: 5 },
        { id: 5, message: 'My fist post', numberLike: 2 }
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ''
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                message: action.newPostBody,
                numberLike: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        }
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        default:
            return state;
    }
};

type ActionsTypes = AddPostActionCreatorActionType | SetUserProfileActionType | SetStatusActionType
    | DeletePostActionType | SavePhotoSuccessActionType

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostBody: string
}
export const addPostActionCreator = (newPostBody: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostBody });

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type DispatchType = Dispatch<ActionsTypes>

export const getUserProfile = (userId: number) => async (dispatch: DispatchType) => {

    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
};
export const getStatus = (userId: number) => async (dispatch: DispatchType) => {

    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: DispatchType) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (file: any) => async (dispatch: DispatchType) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
};

export default profileReducer;
