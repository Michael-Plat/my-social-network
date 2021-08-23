import React, { FC } from "react"
import { Field, Form, Formik } from "formik"
import { FilterType } from "../../redax/usersReducer"

const UsersSearchValidate = (values: any) => {
    const errors = {}
    return errors
}

const UsersSearchForm: FC<PropsType> = (props) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanget(filter)
        setSubmitting(false)
    }
    return <div>
        <Formik
            initialValues={{ term: '', friend: 'null' }}
            validate={UsersSearchValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}

export default UsersSearchForm

type PropsType = {
    onFilterChanget: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}