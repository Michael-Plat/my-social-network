import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, Input, Textarea } from "../../../common/FormsControls/FormControls";
import s from "../ProfileInfo.module.css";
import style from "../../../common/FormsControls/FormControls.module.css";
import { ProfileType } from "../../../../types/types";

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit} >
        {<div><button onClick={() => { }}>save</button></div>}
        <div>{error && <div className={style.formSummaryError}>
            {error}
        </div>}
        </div>
        <div>
            <b>My name</b>: {createField<ProfileDataFormKeysType>("My name", "fullName", Input, [])}
        </div>
        <div>
            <b>Loking for a job</b>:
            {createField<ProfileDataFormKeysType>("", "lookingForAJob", Input, [], { type: "checkbox" })}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField<ProfileDataFormKeysType>("My professional skills", "lookingForAJobDescription", Textarea, [])}
        </div>
        <div>
            <b>About me</b>:
            {createField<ProfileDataFormKeysType>("About me", "aboutMe", Textarea, [])}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    {/* todo: create same solution for embedded object */}
                    <b>{key}: {createField(key, "contacts." + key, Input, [])} </b>
                </div>
            })}
        </div>
    </form>
};

export default reduxForm<ProfileType, PropsType>({ form: 'edit-profile' })(ProfileDataForm);

type PropsType = {
    profile: ProfileType
}
type ProfileDataFormKeysType = GetStringKeys<ProfileType>