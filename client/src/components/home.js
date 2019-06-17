import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from '../action'
import {connect} from 'react-redux'
class home extends Component {
  render() {
    return (
      <div>
        hi this z demo
        <p>
          <Link to="/signup">signup</Link>
        </p>
        <p>
          <Link to="/signin">signin</Link>
        </p>
        <p>
          <button onClick={e=>{this.props.googleAuth(()=>{this.props.history.push('/secret')})}}>sign in with google</button>
        </p>
      </div>
    );
  }
}
export default connect(null,actions) (home);
