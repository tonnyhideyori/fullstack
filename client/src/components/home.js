import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "../action";
import { connect } from "react-redux";

class home extends Component {
  componentDidMount() {
    this.props.googleAuth(() => {
      this.props.history.push('/secret')
    })
  }
  renderDisplay() {}
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
          <a href="/auth/google">
            <button>sign in with google</button>
          </a>
        </p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated
  };
}
export default connect(
  mapStateToProps,
  actions
)(home);
