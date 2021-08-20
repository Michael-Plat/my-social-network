import React, { FC } from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'
import style from './FormControls.module.css'

const FormControl: FC<FormControlPrppsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : " ")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
export const Textarea: FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}
export const Input: FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType, component: FC<WrappedFieldProps>,
    validate: Array<FieldValidatorType>,
    props = {}, text = "") {
    return (
        <div>
            <Field placeholder={placeholder} name={name} component={component}
                validate={validate} {...props} /> {text}
        </div>
    )
}

type FormControlPrppsType = {
    meta: WrappedFieldMetaProps
}

export type GetStringKeys<T> = Extract<keyof T, string>