import React,{Component} from "react";
import { Link } from "react-router-dom";
class home extends Component {
    render() {
        return (
    <div>
      hi this z demo
      <p>
        <Link to="/signup">signup</Link>
      </p>
      <p>
        <Link to="signin">signin</Link>
      </p>
    </div>
  );}
};
export default home;
