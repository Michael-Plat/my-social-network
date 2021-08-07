const ADD_MESSAGE = 'my-social-network/dialogs/ADD-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

type InitialStateType = typeof initialState

let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ] as Array<DialogType>,

    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your it-kamksutra?" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo 34" }
    ] as Array<MessagesType>
};

const dialogsReducer = (state = initialState, action: AddMessageActionCreatorActionType): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: newMessage }]
            };
        default:
            return state;
    }
}

type AddMessageActionCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

export const addMessageActionCreator = (newMessageBody: string): AddMessageActionCreatorActionType => ({ type: ADD_MESSAGE, newMessageBody })

export default dialogsReducer;