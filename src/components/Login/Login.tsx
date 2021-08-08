import React, { FC } from 'react'
import { connect } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Input } from '../common/FormsControls/FormControls'
import { login } from '../../redax/authReducer'
import { Redirect } from 'react-router'
import style from '../common/FormsControls/FormControls.module.css'
import { AppStateType } from '../../redax/reduxStore'

const maxLength30 = maxLengthCreator(30);

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField<LoginFormValuesTypeKeys>("Email", "email", Input, [required, maxLength30])}
            {createField<LoginFormValuesTypeKeys>("Password", "password", Input, [required, maxLength30], { type: "password" })}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", Input, [], { type: "checkbox" }, "remember me")}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", Input, [required])}

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

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);