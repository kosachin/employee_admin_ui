import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { DeletePage } from "./pages/deletepage";
import { EditPage } from "./pages/editpage";
import { HomePage } from "./pages/homepage";
import { fetchEmployeeDataSuccess } from "./context/actions";
import employees from "../src/utils/tempData";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployeeDataSuccess(employees));
  }, []);
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

export default App;
