const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: []
};        
            // { id: 1, photoUrl: 'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png', followed: false, fullName: "Dmitry", status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'} } ,
            // { id: 2, photoUrl: 'https://i.pinimg.com/originals/e8/83/7b/e8837b00067930f307a825c2ff74f3fa.jpg', followed: true, fullName: "Sasha", status: 'I am a boss too', location: {city: 'Moscow', country: 'Russia'} } ,
            // { id: 3, photoUrl: 'https://icdn.lenta.ru/images/2020/04/13/20/20200413205251067/square_320_1c2f649dcc74a8551ec3a3b2a86f26a4.jpg', followed: false, fullName: "Andrey", status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'} } ,
            // { id: 4, photoUrl: 'https://bigpicture.ru/wp-content/uploads/2019/04/grandbeauty27.jpg', followed: true, fullName: "Svetlana", status: 'I am a boss too', location: {city: 'Minsk', country: 'Belarus'} } 
        

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                } )
            }

        case UNFOLLOW:
            return { 
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                } )
            }

        case SET_USERS: {
            return { ...state, users: [ ...state.users, ...action.users ]}
        }
                     
        default:
            return state;
    }
}
export const followAC = (userId) => ({type: FOLLOW, userId})

export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})

export const setUsersAC = (users) => ({type: SET_USERS, users})

export default usersReducer;
