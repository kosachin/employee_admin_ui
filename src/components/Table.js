import styled from "styled-components";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeEmployeeSuccess, reset, setPageData } from "../context/actions";
import {
  deleteFromLocalStorage,
  paginatedData,
} from "../utils/setLocalStorage";

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
  page,
  size,
  handlePageQuerry,
}) => {
  return (
    <div>
      {size.fill(0).map((e, i) => (
        <button
          onClick={() => {
            setPage(i);
            handlePageQuerry(i);
            dispatch(setPageData(paginatedData(i, data.meta.limit)));
          }}
          disabled={page === i}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export const Tabled = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const data = useSelector((store) => store);
  console.log("data", data);
  const [page, setPage] = useState(+searchParams.get("pg") - 1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setPageData(paginatedData(page, data.meta.limit)));
  }, [page]);
  const handlePageQuerry = (page) => {
    setSearchParams({ pg: page + 1 });
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete??")) {
      deleteFromLocalStorage(id);
      dispatch(removeEmployeeSuccess(paginatedData(page, data.meta.limit)));
    }
  };
  const handelNextPageData = () => {
    handlePageQuerry(page + 1);
    setPage((prev) => prev + 1);
    dispatch(setPageData(paginatedData(page + 1, data.meta.limit)));
  };
  const handelPrevPageData = () => {
    handlePageQuerry(page - 1);
    setPage((prev) => prev - 1);
    dispatch(setPageData(paginatedData(page - 1, data.meta.limit)));
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
          {
            // data?.data &&
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
            ))
          }
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
          dispatch={dispatch}
          setPageData={setPageData}
          size={new Array(Math.ceil(data.meta.total / data.meta.limit))}
          handlePageQuerry={handlePageQuerry}
        />
        <button
          style={{
            display:
              page !== Math.ceil(data.meta.total / data.meta.limit) - 1
                ? "block"
                : "none",
          }}
          onClick={handelNextPageData}
        >
          Next
        </button>
      </div>
    </>
  );
};
