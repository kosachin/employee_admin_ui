import {
  FETCH_EMPLOYEE_DATA_REQUEST,
  FETCH_EMPLOYEE_DATA_SUCCESS,
  FETCH_EMPLOYEE_DATA_FAILURE,
} from "../context/actionTypes";

const init = {
  loading: false,
  error: "",
  data: [],
};
export const reducer = (store = init, { type, payload }) => {
  switch (type) {
    case FETCH_EMPLOYEE_DATA_REQUEST:
      return { ...store, loading: true };
    case FETCH_EMPLOYEE_DATA_SUCCESS:
      return { ...store, loading: false, data: payload };
    case FETCH_EMPLOYEE_DATA_FAILURE:
      return { ...store, loading: false, error: payload.message };
    default:
      return store;
  }
};
