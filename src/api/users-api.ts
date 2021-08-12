import { APIResponseType, GetItemsType, instance } from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete<APIResponseType>(`follow/${id}`).then(res => res.data)
    },
};

