import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoanForm from "./LoanForm";
import ContactUs from "./ContactUs";
import CreateAccount from "./CreateAccount";


export default function App() {
  return (
    <>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create-account">
              <CreateAccount />
            </Route>
            <Route path="/contact-us">
              <ContactUs />
            </Route>
            <Route path="/">
              <LoanForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </>


  );


}