import {
  FETCH_EMPLOYEE_DATA_REQUEST,
  FETCH_EMPLOYEE_DATA_SUCCESS,
  FETCH_EMPLOYEE_DATA_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  REMOVE_EMPLOYEE_REQUEST,
  REMOVE_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_FAILURE,
  RESET,
  GET_EMPLOYEE_BY_ID,
  EDIT_EMP,
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

export const removeEmployeeRequest = () => ({
  type: REMOVE_EMPLOYEE_REQUEST,
});

export const removeEmployeeSuccess = (payload) => ({
  type: REMOVE_EMPLOYEE_SUCCESS,
  payload,
});

export const removeEmployeeFailure = (payload) => ({
  type: REMOVE_EMPLOYEE_FAILURE,
  payload,
});

export const reset = () => ({
  type: RESET,
});

export const getEmployeeById = (payload) => ({
  type: GET_EMPLOYEE_BY_ID,
  payload,
});

export const editEmp = (payload) => ({
  type: EDIT_EMP,
  payload,
});
