import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';
import ProfileData from './ProfileData/ProfileData';

const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        );
    };

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div>
                <img src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg' />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto} />
                {props.isOwner && <input type="file" onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />

                {editMode ? <ProfileDataForm profile={props.profile} initialValues={props.profile} onSubmit={onSubmit} />
                    : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={props.profile}
                        isOwner={props.isOwner} />}
            </div>
        </div>
    );
};

export default ProfileInfo;