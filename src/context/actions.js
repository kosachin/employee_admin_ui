import {
  FETCH_EMPLOYEE_DATA_REQUEST,
  FETCH_EMPLOYEE_DATA_SUCCESS,
  FETCH_EMPLOYEE_DATA_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
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

export const addEmployeeRequest = () => ({
  type: ADD_EMPLOYEE_REQUEST,
});

export const addEmployeeSuccess = (payload) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload,
});

export const addEmployeeFailure = (payload) => ({
  type: ADD_EMPLOYEE_FAILURE,
  payload,
});
