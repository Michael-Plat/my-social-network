import { getAuthUserDate } from "./authReducer";

const INITIALIZED_SUCCESS = 'my-social-network/app/INITIALIZED_SUCCESS';

type InitialStateType = typeof initialState;

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: initializedSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS // = 'my-social-network/app/INITIALIZED_SUCCESS'
}
export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDate());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;