import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

const state = {
    posts: [
        { id: 1, message: "Hi, how are you?", numberLike: 15 },
        { id: 2, message: 'It\' s my fist post', numberLike: 20 },
        { id: 3, message: 'Nothing is clear, but very interesting! )', numberLike: 34 },
        { id: 4, message: 'YO', numberLike: 5 },
        { id: 5, message: 'My fist post', numberLike: 2 }
    ]
};

test('length of posts should be incremented', () => {
    // 1. Test data.
    let action = addPostActionCreator("Freedom victori");
    // 2. Action.
    let newState = profileReducer(state, action);

    // 3. Expectation.  
    expect(newState.posts.length).toBe(6);
});
test('message of new post should be correct', () => {
    // 1. Test data.
    let action = addPostActionCreator("Freedom victori");
    // 2. Action.
    let newState = profileReducer(state, action);

    // 3. Expectation.  
    expect(newState.posts[5].message).toBe("Freedom victori")
});
test('after deleting length of maesages should be decrement', () => {
    // 1. Test data.
    let action = deletePost(1);
    // 2. Action.
    let newState = profileReducer(state, action);

    // 3. Expectation.  
    expect(newState.posts.length).toBe(4);
});
test('after deleting length should be decrement if id is incorrect', () => {
    // 1. Test data.
    let action = deletePost(1000);
    // 2. Action.
    let newState = profileReducer(state, action);

    // 3. Expectation.  
    expect(newState.posts.length).toBe(5);
});
