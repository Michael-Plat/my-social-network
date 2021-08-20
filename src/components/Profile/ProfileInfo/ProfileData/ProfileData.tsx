import React, { FC } from "react";
import { ContactsType, ProfileType } from "../../../../types/types";
import s from '../ProfileInfo.module.css';

const ProfileData: FC<PropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
            <div>
                <b>My name</b>: {profile.fullName}
            </div>
            <div>
                <b>Loking for a job</b>: {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                })}
            </div>
        </div>
    );
};

const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
};

export default ProfileData

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}