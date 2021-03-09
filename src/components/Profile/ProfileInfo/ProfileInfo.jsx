import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>
                <img src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg' />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} /> 
                <br/>
                    <p>My name {props.profile.fullName} </p>
                    <p>About me - {props.profile.aboutMe} </p> 
                    <p>My contacts: <br/>{props.profile.contacts.facebook} <br/>{props.profile.contacts.vk}
                    <br/>{props.profile.contacts.twitter} <br/>{props.profile.contacts.instagram} </p>
                ava + description
            </div>
        </div>
    );
}
export default ProfileInfo;