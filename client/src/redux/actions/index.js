import axios from "axios";

import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/auth/current_user");
console.log(res.data)
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const loginUser = () => async (dispatch) => {
  const res = await axios.post("/auth/login");
  dispatch({ type: FETCH_USER, payload: res.data });
};
