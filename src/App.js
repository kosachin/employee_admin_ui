import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { DeletePage } from "./pages/deletepage";
import { EditPage } from "./pages/editpage";
import { HomePage } from "./pages/homepage";
import { fetchEmployeeDataSuccess } from "./context/actions";
import employees from "../src/utils/tempData";
import { compose, lifecycle } from "recompose";
import { setLocalStorage } from "./utils/setLocalStorage";
import tempData from "../src/utils/tempData";

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchEmployeeDataSuccess(employees));
  // }, []);
  return (
    <div className="App">
      {/* <HomePage/> */}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
}
const enhance = compose(
  connect(
    (store) => ({
      totalEmployeesCount: store.meta.total,
    }),
    (dispatch) => ({
      handleFetchOnLoad: (employees) =>
        dispatch(fetchEmployeeDataSuccess(employees)),
    })
  ),
  lifecycle({
    componentDidMount() {
      setLocalStorage(tempData);
      this.props.handleFetchOnLoad(
        JSON.parse(localStorage.getItem("employees")).slice(0, 20) ||
          tempData.slice(0, 20)
      );
    },
  })
);
export default enhance(App);
