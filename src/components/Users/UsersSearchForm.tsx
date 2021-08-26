import React, { FC } from "react"
import { Field, Form, Formik } from "formik"
import { FilterType } from "../../redax/usersReducer"
import { useSelector } from "react-redux"
import { getUsersFilter } from "../../redax/usersSelectors"

const UsersSearchValidate = (values: any) => {
    const errors = {}
    return errors
}

const UsersSearchForm: FC<PropsType> = (props) => {

    const filter = useSelector(getUsersFilter)

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
            enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
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

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: FriendFormType
}