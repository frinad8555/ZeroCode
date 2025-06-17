import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Displays/Home";
import { Editor } from "./Displays/Editor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeScreen/>} />
        <Route path="/editor" element={<Editor/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
