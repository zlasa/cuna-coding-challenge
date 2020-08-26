import React, { useState } from "react";
import { update } from "lodash";

function CreateAccount() {
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
    function handleChange(event) {
        event.preventDefault();
        const { name, value }=event.target;
        let updatedLoginForm={ ...loginForm };
        updatedLoginForm[name] = value;
        let error=''
        switch(name) {
            case 'userName': {
                if(emailRegex.exec(value)==null) {
                    error='Invalid email address';
                }
                updatedLoginForm.errors[name]=error;
                break;
            }
            case 'password': {
                if (value.length <=8) 
                {
                    error='Password must contain 8 or more characters';
                }
                else if (loginForm.confirmPassword != value) {
                    error = "Password missmatch";
                }
                updatedLoginForm.errors[name]=error;
                break;
            }
            case 'confirmPassword': {
                if (value.length <=8) 
                {
                    error='Password must contain 8 or more characters';
                }
                else if (loginForm.password != value) {
                    error = "Password missmatch";
                }
                updatedLoginForm.errors[name]=error;
            }
            default:
                break;
        }
        setLoginForm(updatedLoginForm);
    }
    function handleSubmit(event) {

    }
    return (
        <form>
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