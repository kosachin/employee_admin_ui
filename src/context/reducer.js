import {
  FETCH_EMPLOYEE_DATA_REQUEST,
  FETCH_EMPLOYEE_DATA_SUCCESS,
  FETCH_EMPLOYEE_DATA_FAILURE,
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_SUCCESS,
  RESET,
  EDIT_EMP,
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
    case ADD_EMPLOYEE_REQUEST:
      return { ...store, loading: true };
    case ADD_EMPLOYEE_SUCCESS:
      // console.log(payload);
      return { ...store, loading: false, data: [...store.data, payload] };
    case ADD_EMPLOYEE_FAILURE:
      return { ...store, loading: false, error: payload.message };
    case REMOVE_EMPLOYEE_SUCCESS:
      const filteredData = store.data.filter((emp) => 0);
      return { ...store, data: filteredData };
    case EDIT_EMP:
      // console.log("edit emp data", payload);
      const info = store.data.map((e) => {
        if (e.id === payload.id) {
          return payload;
        }
        return e;
      });
      // console.log(info);
      return { ...store, data: info };

    case RESET:
      return init;
    default:
      return store;
  }
};
