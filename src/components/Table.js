import styled from "styled-components";
import employees from "../utils/tempData";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [num, setNum] = useState(data.data.length);
  const [disable, setDisable] = useState(0);
  console.log(num);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete??")) {
      dispatch(removeEmployeeSuccess(id));
    }
  };
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
            data.data.slice(20 * page, 20 + 20 * page).map((employee) => (
              <Tr key={employee.id}>
                <Td>{employee.id}</Td>
                <Td>{employee.name}</Td>
                <Td>{employee.email}</Td>
                <Td>{employee.age}</Td>
                <Td>{employee.role}</Td>
                <Td>
                  <Btn onClick={() => navigate(`/edit/${employee.id}`)}>
                    Edit
                  </Btn>
                  <Btn onClick={() => handleDelete(employee.id)}>Delete</Btn>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          style={{ display: page < 1 ? "none" : "block" }}
          onClick={() => {
            setDisable(page - 1);
            setPage((prev) => prev - 1);
          }}
          // disabled={disable===i}
        >
          Prev
        </button>
        {new Array(data.total / 20).fill(0).map((e, i) => (
          <button
            onClick={() => {
              setPage(i);
              setDisable(i);
            }}
            disabled={disable === i}
          >
            {i + 1}
          </button>
        ))}
        <button
          style={{ display: page !== data.total / 20 - 1 ? "block" : "none" }}
          onClick={() => {
            setDisable(page + 1);
            if (page !== data.total / 20 - 1) {
              return setPage((prev) => prev + 1);
            } else {
              return null;
            }
            // page !== data.total / 20 - 1 ? setPage((prev) => prev + 1) : null;
          }}
          // disabled={disa}
        >
          Next
        </button>
      </div>
    </>
  );
};
