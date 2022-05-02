// import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import { DeletePage } from "./pages/deletepage";
import { EditPage } from "./pages/editpage";
import { HomePage } from "./pages/homepage";
import { fetchEmployeeDataSuccess } from "./context/actions";
// import employees from "../src/utils/tempData";
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
      <Routes>
        <Route path={"/employees"} element={<HomePage />} />
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
      currStart: store.meta.currStart,
      limit: store.meta.limit,
    }),
    (dispatch) => ({
      handleFetchOnLoad: (size) => dispatch(fetchEmployeeDataSuccess(size)),
    })
  ),
  lifecycle({
    componentDidMount() {
      setLocalStorage(tempData);
      const { handleFetchOnLoad } = this.props;
      const lsData = JSON.parse(localStorage.getItem("employees"));
      handleFetchOnLoad(lsData.data.length);
    },
  })
);
export default enhance(App);
