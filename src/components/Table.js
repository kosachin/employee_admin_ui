import styled from "styled-components";
import employees from "../utils/tempData";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeEmployeeSuccess,
  fetchEmployeeDataSuccess,
  reset,
} from "../context/actions";

const Table = styled.table`
  //   background-color: red;
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th``;
const Td = styled.td``;
const Btn = styled.button``;

export const Tabled = () => {
  const data = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
      <Table>
        <Thead>
          <Tr>
            <Th>Sr no.</Th>
            <Th>full name</Th>
            <Th>email</Th>
            <Th>age</Th>
            <Th>designation</Th>

            <Th onClick={() => navigate("/edit")}>
              <AiOutlineUserAdd />
              Add
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data &&
            data.data.map((employee) => (
              <Tr key={employee.id}>
                <Td>{employee.id}</Td>
                <Td>{employee.name}</Td>
                <Td>{employee.email}</Td>
                <Td>{employee.role}</Td>
                <Td>{employee.age}</Td>
                <Td>
                  <Btn onClick={() => navigate(`/edit/${employee.id}`)}>
                    Edit
                  </Btn>
                  <Btn
                    onClick={() => dispatch(removeEmployeeSuccess(employee.id))}
                  >
                    Delete
                  </Btn>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};
