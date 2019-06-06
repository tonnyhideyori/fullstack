import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../action";
import { compose } from "redux";
import { connect } from "react-redux";

class Login extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push("/secret");
    });
  };
  renderError() {
    if (this.props.err !== null) {
      return <div>{this.props.err}</div>;
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset className="form-group">
            <label>name</label>
            <Field
              name="name"
              type="text"
              component="input"
              placeholder="write your name"
              className="form-control"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>password</label>
            <Field
              name="password"
              type="password"
              component="input"
              placeholder="********"
              className="form-control"
            />
          </fieldset>
          <div>{this.renderError()}</div>
          <button className="btn btn-danger btn-lg">login</button>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { err: state.auth.errorMessage };
}
export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Login);
