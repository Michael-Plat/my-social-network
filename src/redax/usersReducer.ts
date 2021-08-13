import { ResuitCodesEnum } from '../api/api';
import { Dispatch } from "redux";
import { UsersType } from "../types/types";
import { updateObjectInArray } from "../utils/objectHelpers";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { usersAPI } from '../api/users-api';

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
        case 'MSN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }

        case 'MSN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }

        case 'MSN/USERS/SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'MSN/USERS/SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'MSN/USERS/SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case 'MSN/USERS/TOGGLE_IS_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'MSN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {

    followSuccess: (userId: number) => ({ type: 'MSN/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'MSN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>,) => ({ type: 'MSN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'MSN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'MSN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'MSN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: 'MSN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)

}

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

const _followUnfollowFlow = async (dispatch: Dispatch, id: number, apiMethod: any,
    actionCreator: (id: number) => ActionsType) => {

    dispatch(actions.toggleFollowingProgress(true, id));
    const data = await apiMethod(id)
    if (data.resultCode == ResuitCodesEnum.Success) {
        dispatch(actionCreator(id));
    }
    dispatch(actions.toggleFollowingProgress(false, id));
}

export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    };
}
export const unfollow = (id: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    };
}

export default usersReducer;

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>