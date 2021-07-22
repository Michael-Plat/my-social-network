import React from "react";
import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../../common/FormsControls/FormControls";
import s from "../ProfileInfo.module.css";
import style from "../../../common/FormsControls/FormControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit} >
        {<div><button onClick={() => { }}>save</button></div>}
        <div>{error && <div className={style.formSummaryError}>
            {error}
        </div>}
        </div>
        <div>
            <b>My name</b>: {createField("My name", "fullName", Input, [])}
        </div>
        <div>
            <b>Loking for a job</b>:
            {createField("", "lookingForAJob", Input, [], { type: "checkbox" })}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField("My professional skills", "lookingForAJobDescription", Textarea, [])}
        </div>
        <div>
            <b>About me</b>:
            {createField("About me", "aboutMe", Textarea, [])}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, "contacts." + key, Input, [])} </b>
                </div>
            })}
        </div>
    </form>
};

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataFormReduxForm;

