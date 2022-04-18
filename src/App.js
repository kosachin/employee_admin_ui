import { Routes, Route } from "react-router-dom";
import "./App.css";
import { DeletePage } from "./pages/deletepage";
import { EditPage } from "./pages/editpage";
import { HomePage } from "./pages/homepage";

function App() {
  return (
    <div className="App">
      {/* <HomePage/> */}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={"/"}>
          <Route path={"edit"} element={<EditPage />}>
            <Route path=":id" element={<EditPage />} />
          </Route>
          <Route path={"delete/:id"} element={<DeletePage />}>
            {/* <Route path=":id" element={<EditPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
