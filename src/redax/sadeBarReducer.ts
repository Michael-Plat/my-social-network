type InitialStateType = typeof initialState;

const initialState = {
    nameFriends: [
        { id: 1, friend: 'Andrew', },
        { id: 2, friend: 'Sasha' },
        { id: 3, friend: 'Sveta' }
    ],
    friendsAvatars: [
        { id: 1, avatar: 'https://nashkomp.ru/wp-content/uploads/2017/01/0-2.jpg' },
        { id: 2, avatar: 'https://trikky.ru/wp-content/blogs.dir/1/files/2020/05/16/screenshot_20200425_081212.jpg' },
        { id: 3, avatar: 'data:image/jpeg;base64,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' }
    ]
};


const sadeBarReducer = (state = initialState, action: any): InitialStateType => {

    return state;
}
export default sadeBarReducer;
