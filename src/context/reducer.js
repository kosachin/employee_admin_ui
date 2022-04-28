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
  SET_PAGE_DATA,
} from "../context/actionTypes";

const init = {
  loading: false,
  error: "",
  data: [],
  meta: {
    total: 0,
    start: 0,
    currStart: 0,
    limit: 20,
  },
};
export const reducer = (store = init, { type, payload }) => {
  switch (type) {
    case FETCH_EMPLOYEE_DATA_REQUEST:
      return { ...store, loading: true };
    case FETCH_EMPLOYEE_DATA_SUCCESS:
      console.log("here");
      return {
        ...store,
        loading: false,
        data: payload,
        meta: {
          ...store.meta,
          total: JSON.parse(localStorage.getItem("employees")).length,
        },
      };
    case FETCH_EMPLOYEE_DATA_FAILURE:
      return { ...store, loading: false, error: payload.message };
    case ADD_EMPLOYEE_REQUEST:
    // return { ...store, loading: true,data: };
    case ADD_EMPLOYEE_SUCCESS:
    // localStorage.setItem(
    //   "employees",
    //   JSON.stringify([...store.data, payload])
    // );
    // return { ...store, loading: false, data: [...store.data, payload] };
    case ADD_EMPLOYEE_FAILURE:
      return { ...store, loading: false, error: payload.message };
    case REMOVE_EMPLOYEE_SUCCESS:
      console.log(payload);
      // const filteredData = store.data.filter((emp) => emp.id !== payload);
      return { ...store, data: payload };
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

    case SET_PAGE_DATA:
      console.log(JSON.parse(localStorage.getItem("employees")));
      console.log({
        ...store,
        data: JSON.parse(localStorage.getItem("employees")),
        meta: {
          ...store.meta,
          currStart: store.meta.limit * payload,
        },
      });
      return {
        ...store,
        data: store.data.slice(40, 60),
        meta: {
          ...store.meta,
          currStart: store.meta.limit * payload,
        },
      };
    case RESET:
      return init;

    default:
      return store;
  }
};
