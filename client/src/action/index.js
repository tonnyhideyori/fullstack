import axios from "axios";
import * as qs from "query-string";
import { AUTH_USER, AUTH_ERROR } from "./types";
//axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const signup = (formProps, callback) => async dispatch => {
  try {
    console.log(formProps);
    const res = await axios.post("/app/signup", formProps);
    dispatch({
      type: AUTH_USER,
      payload: res.data
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    callback();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data
    });
  }
};
export const googleAuth = () => dispatch => {
  const res = qs.parse(window.location.search);
  let data = { name: res.name, id: res.id };
  
  console.log(JSON.stringify(data));
  dispatch({
    type: AUTH_USER,
    payload: data
  });
  localStorage.setItem("user", JSON.stringify(data));
  //callback();
};
export const logout = callback => {
  localStorage.removeItem("user");
  callback();
  return {
    type: AUTH_USER,
    payload: null
  };
};
export const signin = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post("/app/signin", formProps);
    dispatch({
      type: AUTH_USER,
      payload: res.data
    });
    console.log(JSON.stringify(res.data));
    localStorage.setItem("user", JSON.stringify(res.data));
    callback();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data
    });
  }
};
