import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../action";

class register extends Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push("/secret");
    });
  };
  renderError() {
    if (this.props.err!==null) {
      return <div>{this.props.err}</div>;
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset className="form-group">
          <label> Name</label>
          <Field
            name="name"
            type="text"
            component="input"
            autoComplete="none"
            placeholder="Write your name"
            className="form-control"
          />
        </fieldset>

        <fieldset className="form-group">
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
            className="form-control"
          />
        </fieldset>
        <div>{this.renderError()}</div>
        <button className="btn btn-danger btn-lg">signUp</button>
      </form>
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
  reduxForm({ form: "signup" })
)(register);
