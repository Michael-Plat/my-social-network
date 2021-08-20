import React, { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../../utils/validators/validators"
import { createField, GetStringKeys, Textarea } from "../../common/FormsControls/FormControls"
import { NewMessageFormValuesType } from "../Dialogs"

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", Textarea, [required, maxLength50])}
            </div>
            <div>
                <button>Message</button>
            </div>
        </form>
    )
}

export default reduxForm<NewMessageFormValuesType>({ form: "dialogAddMessageForm" })(AddMessageForm);

type NewMessageFormValuesKeysType = GetStringKeys<NewMessageFormValuesType>

type PropsType = {}