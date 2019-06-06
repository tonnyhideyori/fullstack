import React, { Component } from "react";
import Register from "./register";
import secret from "./secret";
import login from './login'
import Home from './home'
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../action'

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Home}/>
            <Route exact path="/signup" component={Register} />
            <Route exact path="/secret" component={secret} />

            <Route exact path="/signin" component={login} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null,actions) (App);
