import React, { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../../utils/validators/validators";
import { createField, GetStringKeys, Textarea } from "../../../common/FormsControls/FormControls";
import { AddPostFormValuesType } from "../MyPosts"

const maxLength50 = maxLengthCreator(50);

const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesKeysType>("New Post", "newPostBody", Textarea, [required, maxLength50])}

                {/* <Field component={Textarea} name="newPostBody" placeholder="New Post"
          validate={[required, maxLength10]} /> */}
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({ form: "myPostsAddPostForm" })(AddPostForm)

type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>

type PropsType = {}