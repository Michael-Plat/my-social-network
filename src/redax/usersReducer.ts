import { ResuitCodesEnum } from '../api/api';
import { Dispatch } from "redux";
import { UsersType } from "../types/types";
import { updateObjectInArray } from "../utils/objectHelpers";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { usersAPI } from '../api/users-api';

type InitialStateType = typeof initialState

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }

        case 'SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case 'TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {

    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>,) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)

}

type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.toggleIsFetching(true));

        const data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
}

const _followUnfollowFlow = async (dispatch: DispatchType, id: number, apiMethod: any,
    actionCreator: (id: number) => ActionsType) => {

    dispatch(actions.toggleFollowingProgress(true, id));
    const data = await apiMethod(id)
    if (data.resultCode == ResuitCodesEnum.Success) {
        dispatch(actionCreator(id));
    }
    dispatch(actions.toggleFollowingProgress(false, id));
}

export const follow = (id: number): ThunkType => {
    return (dispatch) => {
        _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    };
}
export const unfollow = (id: number): ThunkType => {
    return (dispatch) => {
        _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    };
}

export default usersReducer;
