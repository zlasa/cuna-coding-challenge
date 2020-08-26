import React from "react";
import { useHistory } from "react-router-dom";
function Disqualification(props) {
    const history = useHistory();
    if (props.loanResponse.reason.length === 0) {
        history.push('/');
    }
    return (
        <div className="p-5 container">
            <h1 className="text-center pb-1">Disqualification</h1>
            <div className="alert alert-danger">{props.loanResponse.reason}</div>
            <p class="lead">Contact Us:</p>
            <div>Phone: 800-888-8888</div>
            <div>Email: cuna@customerservice.com</div>
        </div>
    )
}

export default Disqualification;