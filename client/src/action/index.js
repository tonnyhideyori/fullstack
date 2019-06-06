import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";

export const signup = (formProps, callback) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:5000/app/signup", formProps);
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
        const res = await axios.post('http://localhost:5000/app/signin', formProps)
        dispatch({
            type: AUTH_USER,
            payload:res.data
        })
        localStorage.setItem('user', JSON.stringify(res.data))
        callback()
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload:error.response.data
        })
    }
}
