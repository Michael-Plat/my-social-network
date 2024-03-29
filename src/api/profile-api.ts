import { PhotosType, ProfileType } from "../types/types";
import { APIResponseType, instance } from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`Profile/` + userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`Profile/Status/` + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`Profile/Status`, { status: status }).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`Profile/Photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`Profile`, profile).then(res => res.data)
    }
};

