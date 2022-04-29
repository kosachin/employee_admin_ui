import styled from "styled-components";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeEmployeeSuccess, reset, setPageData } from "../context/actions";
import { paginatedData } from "../utils/setLocalStorage";

const Table = styled.table`
  //   background-color: red;
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th``;
const Td = styled.td``;
const Btn = styled.button``;

const PaginatedNumberedButtons = ({
  data,
  dispatch,
  setPage,
  setDisable,
  disable,
  size,
  page,
}) => {
  return (
    <>
      {size.fill(0).map((e, i) => (
        <button
          onClick={() => {
            setDisable(i);
            setPage(i);
            dispatch(
              setPageData(
                paginatedData(i, data.meta.currStart, data.meta.limit)
              )
            );
          }}
          disabled={disable === i}
        >
          {i + 1}
        </button>
      ))}
    </>
  );
};
export const Tabled = () => {
  const data = useSelector((store) => store);

  const [disable, setDisable] = useState(0);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete??")) {
      let allData = JSON.parse(localStorage.getItem("employees"));
      let res = allData.filter((e) => e.id !== id);
      localStorage.setItem("employees", JSON.stringify(res));
      const newData = JSON.parse(localStorage.getItem("employees"));

      dispatch(
        removeEmployeeSuccess(
          newData.slice(
            data.meta.currStart,
            data.meta.currStart + data.meta.limit
          )
        )
      );
    }
  };
  const handelNextPageData = () => {
    setDisable(page + 1);
    setPage((prev) => prev + 1);
    dispatch(
      setPageData(paginatedData(page + 1, data.meta.currStart, data.meta.limit))
    );
  };
  const handelPrevPageData = () => {
    setDisable(page - 1);
    setPage((prev) => prev - 1);
    dispatch(
      setPageData(paginatedData(page - 1, data.meta.currStart, data.meta.limit))
    );
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
            data.data.map((employee) => (
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
          onClick={handelPrevPageData}
        >
          Prev
        </button>
        <PaginatedNumberedButtons
          data={data}
          page={page}
          setPage={setPage}
          disable={disable}
          dispatch={dispatch}
          setPageData={setPageData}
          setDisable={setDisable}
          size={new Array(Math.ceil(data.meta.total / data.meta.limit))}
        />
        <button
          style={{
            display:
              page !== Math.ceil(data.meta.total / 20) - 1 ? "block" : "none",
          }}
          onClick={handelNextPageData}
        >
          Next
        </button>
      </div>
    </>
  );
};

{
  /* {new Array(Math.ceil(data.meta.total / data.meta.limit))
  .fill(0)
  .map((e, i) => (
    <button
      onClick={() => {
        dispatch(setPageData(i));
        setPage(i);
        setDisable(i);
      }}
      disabled={disable === i}
    >
      {i + 1}
    </button>
  ))} */
}
