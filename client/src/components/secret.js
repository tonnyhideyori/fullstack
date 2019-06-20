import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from 'redux'
import requireAuth from './requireAuth'
import { Link } from 'react-router-dom'
import * as actions from '../action'
class secret extends Component {
  componentDidMount() {
    this.props.googleAuth()
  }
    renderDisplay() {
      if (this.props.person !== null) {
         
        return <div> hi {this.props.person.name}
          <p>your Id is {this.props.person.id} </p></div>
      }
  }
  render() {
    console.log(this.props.person);

    return (
      <div>
       {this.renderDisplay()}
        <Link
          to="/"
          onClick={e =>
            this.props.logout(() => {
              this.props.history.push("/");
            })
          }
        >
          log out
        </Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { person: state.auth.authenticated };
}
export default compose(connect(mapStateToProps,actions),requireAuth)(secret);
