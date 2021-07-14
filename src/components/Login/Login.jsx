import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators.js';
import { createField, Input } from '../common/FormsControls/FormControls';
import { login } from '../../redax/authReducer.js';
import { Redirect } from 'react-router';
import style from '../common/FormsControls/FormControls.module.css';

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", Input, [required, maxLength30])}
            {createField("Password", "password", Input, [required, maxLength30], { type: "password" })}
            {createField(null, "rememberMe", Input, null, { type: "checkbox" }, "remember me")}

            { error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);