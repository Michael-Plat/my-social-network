import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, GetStringKeys, Input } from '../common/FormsControls/FormControls'
import { login } from '../../redax/authReducer'
import { Redirect } from 'react-router'
import style from '../common/FormsControls/FormControls.module.css'
import { AppStateType } from '../../redax/reduxStore'

const maxLength30 = maxLengthCreator(30);

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField<LoginFormValuesKeysType>("Email", "email", Input, [required, maxLength30])}
            {createField<LoginFormValuesKeysType>("Password", "password", Input, [required, maxLength30], { type: "password" })}
            {createField<LoginFormValuesKeysType>(undefined, "rememberMe", Input, [], { type: "checkbox" }, "remember me")}

            {captchaUrl && <img src={captchaUrl} alt={'captcha url'} />}
            {captchaUrl && createField<LoginFormValuesKeysType>("Symbols from image", "captcha", Input, [required])}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

export const Login: FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesKeysType = GetStringKeys<LoginFormValuesType>