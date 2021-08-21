import React, { FC } from 'react'
import { ProfileType } from '../../types/types'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile: FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto} profile={props.profile} isOwner={props.isOwner}
        status={props.status} updateStatus={props.updateStatus} saveProfile={props.saveProfile} />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}