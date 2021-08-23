import React, { FC } from "react"
import { Field, Form, Formik } from "formik"
import { FilterType } from "../../redax/usersReducer"

const UsersSearchValidate = (values: any) => {
    const errors = {}
    return errors
}

const UsersSearchForm: FC<PropsType> = (props) => {
    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanget(values)
        setSubmitting(false)
    }
    return <div>
        <Formik
            initialValues={{ term: '' }}
            validate={UsersSearchValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <button type="submit" disabled={isSubmitting}>
                        Submit
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