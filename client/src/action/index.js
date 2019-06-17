import axios from "axios";
import { AUTH_USER, AUTH_ERROR, AUTH_USER_GOOGLE } from "./types";
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
export const googleAuth = callback => async dispatch => {
  try {
    await axios.get("/auth/google");
    let res = await axios.get("/auth/google/callback");
    console.log(res.data);
    dispatch({
      type: AUTH_USER_GOOGLE,
      payload: res.data
    });
    callback();
  } catch (error) {}
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
    localStorage.setItem("user", JSON.stringify(res.data));
    callback();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data
    });
  }
};
