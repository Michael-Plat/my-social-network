import { getAuthUserDate } from "./authReducer"
import { InferActionsTypes } from "./reduxStore"

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'MSN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({ type: 'MSN/APP/INITIALIZED_SUCCESS' } as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDate());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export default appReducer;