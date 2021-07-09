import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/Validators';
import { Input } from '../common/Preloader/FormsControls/FormControls';

const maxLength10 = maxLengthCreator(10);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input} 
                       validate={[required, maxLength10]} />
            </div>
            <div>
                <Field placeholder={"Password"} name={"passowod"} component={Input}
                       validate={[required, maxLength10]} />
            </div>
            <div>
                <Field component={Input} name={"rememberMe "} type={"checkbox"} /> remember me
                </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}
 
export default Login;