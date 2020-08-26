import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CreateAccount(props) {
    const history = useHistory();
    //eslint-disable-next-line
    const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [loginForm, setLoginForm]=useState({
        username: '',
        password: '',
        confirmPassword: '',
        errors: {
            userName: '',
            password: '',
            confirmPassword: ''
        }
    });
    function validateAllForm() {
        let isValid = isFormPropertyValid('userName', loginForm.userName);
        isValid = isFormPropertyValid('password', loginForm.password) && isValid;
        isValid = isFormPropertyValid('confirmPassword', loginForm.confirmPassword) && isValid;
        return isValid
    }
    function isFormPropertyValid(name, value) {
        let updatedLoginForm={ ...loginForm };
        updatedLoginForm[name] = value;
        let error=''
        switch(name) {
            case 'userName': {
                if(emailRegex.exec(value)==null) {
                    error='Invalid email address';
                }
                break;
            }
            case 'password': {
                if (value.length <8) 
                {
                    error='Password must contain 8 or more characters';
                }
                else if (loginForm.confirmPassword !== value) {
                    error = "Password missmatch";
                }
                else if (loginForm.confirmPassword === value) {
                    loginForm.errors.confirmPassword = '';
                }
                break;
            }
            case 'confirmPassword': {
                if (value.length <8) 
                {
                    error='Password must contain 8 or more characters';
                }
                else if (loginForm.password !== value) {
                    error = "Password missmatch";
                }
                else if (loginForm.password === value) {
                    loginForm.errors.password = '';
                }
                break;
            }
            default:
                break;
        }
        updatedLoginForm.errors[name]=error;
        setLoginForm(updatedLoginForm);
        return error.length === 0;
    }
    function handleChange(event) {
        event.preventDefault();
        const { name, value }=event.target;
        isFormPropertyValid(name, value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        const isValid = validateAllForm();
        if (isValid) {
            alert('Your account has been successfully created!')
        }
    }
    if (!props.loanResponse.isQualified) {
        history.push('/');
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h1 className="text-center">Create Account</h1>
                <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input type="text" className="form-control" name="userName"
                        onChange={handleChange}
                        value={loginForm.userName}
                    />
                    {loginForm.errors.userName.length>0&&
                        <div className='text-danger'>{loginForm.errors.userName}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Passsword</label>
                    <input type="password" className="form-control" name="password"
                        onChange={handleChange}
                        value={loginForm.password}
                    />
                    {loginForm.errors.password.length>0&&
                        <div className='text-danger'>{loginForm.errors.password}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword"
                        onChange={handleChange}
                        value={loginForm.confirmPassword} />
                            {loginForm.errors.confirmPassword.length>0&&
                        <div className='text-danger'>{loginForm.errors.confirmPassword}</div>}
                </div>
                <button type="submit" className="btn btn-primary float-right">Submit</button>
            </div>
        </form>
    )

}
export default CreateAccount;