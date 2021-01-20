const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
        posts: [
            { id: 1, message: "Hi, how are you?", numberLike: 15 },
            { id: 2, message: 'It\' s my fist post', numberLike: 20 },
            { id: 3, message: 'Nothing is clear, but very interesting! )', numberLike: 34 },
            { id: 4, message: 'YO', numberLike: 5 },
            { id: 5, message: 'My fist post', numberLike: 2 }
        ],
        newPostText: 'IT-kamasutRa'
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 6,
                message: state.newPostText,
                numberLike: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }    
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }    
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const onPostChangeActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text})

export default profileReducer;
