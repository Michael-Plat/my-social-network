import { profileAPI, usersAPI } from "../api/Api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS  = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

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
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostBody) => ({ type: ADD_POST, newPostBody })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const setStatus = (status) => ({ type: SET_STATUS, status } )

export const deletePost = (postId) => ({ type: DELETE_POST, postId } )

export const getUserProfile = (userId) => (dispatch) => {

    usersAPI.getProfile(userId)
      .then(response => {
        dispatch(setUserProfile(response.data));
      });
}
export const getStatus = (userId) => (dispatch) => {

    profileAPI.getStatus(userId)
      .then(response => {
        dispatch(setStatus(response.data));
      });
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
      .then(response => {
        if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
        }
      });
}

export default profileReducer;
