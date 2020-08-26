import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoanForm from "./LoanForm";
import Disqualification from "./Disqualification";
import CreateAccount from "./CreateAccount";


export default function App() {
  const [loanResponse, setLoanResponse] = useState({isQualified: true, reason: ''})
  return (
    <>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create-account">
              <CreateAccount loanResponse={loanResponse}/>
            </Route>
            <Route path="/disqualification">
              <Disqualification loanResponse={loanResponse} />
            </Route>
            <Route path="/">
              <LoanForm setLoanResponse= {setLoanResponse}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>


  );


}