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
  SET_PAGE_INFO_DATA,
} from "../context/actionTypes";
import { localStorageDataSize } from "../utils/setLocalStorage";

const init = {
  loading: false,
  error: "",
  data: [],
  meta: {
    total: 0,
    limit: 20,
  },
};
export const reducer = (store = init, { type, payload }) => {
  switch (type) {
    case FETCH_EMPLOYEE_DATA_REQUEST:
      return { ...store, loading: true };
    case FETCH_EMPLOYEE_DATA_SUCCESS:
      return {
        ...store,
        loading: false,
        meta: {
          ...store.meta,
          total: payload,
        },
      };
    case FETCH_EMPLOYEE_DATA_FAILURE:
      return { ...store, loading: false, error: payload.message };
    case ADD_EMPLOYEE_REQUEST:
      return { ...store, loading: true };
    case ADD_EMPLOYEE_SUCCESS:
      console.log("here in ");
      return {
        ...store,
        meta: { ...store.meta, total: localStorageDataSize() },
      };
    case ADD_EMPLOYEE_FAILURE:
      return { ...store, loading: false, error: payload.message };
    case REMOVE_EMPLOYEE_SUCCESS:
      return {
        ...store,
        data: payload.data,
        meta: { ...store.meta, total: localStorageDataSize() },
      };
    case EDIT_EMP:
      // console.log("edit emp data", payload);
      const info = store.data.map((e) => {
        if (e.id === payload.id) {
          return payload;
        }
        return e;
      });
      return { ...store, data: info };

    case SET_PAGE_DATA:
      return {
        ...store,
        data: payload.data,
        meta: {
          ...store.meta,
        },
      };
    case RESET:
      return init;

    default:
      return store;
  }
};
