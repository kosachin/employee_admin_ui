import {
  FETCH_EMPLOYEE_DATA_REQUEST,
  FETCH_EMPLOYEE_DATA_SUCCESS,
  FETCH_EMPLOYEE_DATA_FAILURE,
} from "../context/actionTypes";

export const fetchEmployeeDataRequest = () => ({
  type: FETCH_EMPLOYEE_DATA_REQUEST,
});

export const fetchEmployeeDataSuccess = (payload) => ({
  type: FETCH_EMPLOYEE_DATA_SUCCESS,
  payload,
});

export const fetchEmployeeDataFailure = (payload) => ({
  type: FETCH_EMPLOYEE_DATA_FAILURE,
  payload,
});
