import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/Api";

const ADD_POST = 'my-social-network/profile/ADD-POST';
const SET_USER_PROFILE = 'my-social-network/profile/SET_USER_PROFILE';
const SET_STATUS = 'my-social-network/profile/SET_STATUS';
const DELETE_POST = 'my-social-network/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'my-social-network/profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", numberLike: 15 },
        { id: 2, message: 'It\' s my fist post', numberLike: 20 },
        { id: 3, message: 'Nothing is clear, but very interesting! )', numberLike: 34 },
        { id: 4, message: 'YO', numberLike: 5 },
        { id: 5, message: 'My fist post', numberLike: 2 }
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {

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
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        default:
            return state;
    }
};

export const addPostActionCreator = (newPostBody) => ({ type: ADD_POST, newPostBody });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({ type: SET_STATUS, status });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = (userId) => async (dispatch) => {

    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
};
export const getStatus = (userId) => async (dispatch) => {

    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};
export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
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
