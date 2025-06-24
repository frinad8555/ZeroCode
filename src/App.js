import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Displays/Home";
import { Editor } from "./Displays/Editor";
import "./index.scss";
import { PlaygroundProvider } from "./Provider/PlaygroundProvider";
import { ModalProvider } from "./Provider/ModalProvider";
import { Modal } from "./Provider/Modals/Modal";

function App() {
  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <Modal />
          <Routes>
            <Route path="" element={<HomeScreen />} />
            <Route path="/editor/:fileId/:folderId" element={<Editor />} />
            
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
}

export default App;
