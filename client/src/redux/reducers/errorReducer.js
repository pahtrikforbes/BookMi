import { FETCH_ERRORS } from "../actions/types";

export default function (state = null, action) {
  console.log(action.type);
  switch (action.type) {
    case FETCH_ERRORS:
      return action.payload || false;
    default:
      return state;
  }
}
