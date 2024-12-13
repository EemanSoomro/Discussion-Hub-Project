import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./AuthActions";

export const loginCall = async (userCredential, dispatch) => {
  dispatch(loginStart);
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      userCredential
    );
    dispatch(loginSuccess(res.data));
    dispatch(loginSuccess(res.data));
  } catch (err) {
  dispatch(loginFailure());
  }
};
