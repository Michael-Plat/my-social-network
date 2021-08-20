import React, { ChangeEvent, FC, useState } from 'react'
import Preloader from '../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from './ProfileDataForm/ProfileDataForm'
import ProfileData from './ProfileData/ProfileData'
import { ProfileType } from '../../../types/types'

const ProfileInfo: FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    const [editMode, setEditMode] = useState(false);

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then  
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div>
                <img src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg' />
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

                {editMode ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} />
                    : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile}
                        isOwner={isOwner} />}
            </div>
        </div>
    )
}

export default ProfileInfo

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
