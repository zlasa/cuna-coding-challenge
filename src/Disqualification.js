import React from "react";
import LoremIpsum from "./LoremIpsum";
function Disqualification(props) {
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