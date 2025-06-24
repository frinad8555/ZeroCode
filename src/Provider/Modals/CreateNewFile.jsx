import { useContext } from "react"
import { ModalContext } from "../ModalProvider"
import "./createNewFile.scss";
import { v4 } from "uuid";
import { PlayContext, codeSnippet, languages } from "../PlaygroundProvider";

export const CreateNewFile = () => {
    const { closeModal, payload } = useContext(ModalContext);
    const { createNewFile } = useContext(PlayContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const name = e.target.fileName.value;
        const language = e.target.language.value;

        const file = {
            id: v4(),
            filename: name,
            language: languages[language],
            default: codeSnippet[language]
        }
        createNewFile(payload, file);
        closeModal();
    }
    return (
        <div className="modal-container">
            <form className="modal-form" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined close">close</span>
                <h1>Create New File</h1>
                <div className="form-item">
                    <input name="fileName" required placeholder="Enter File Name here"/>
                </div>
                <div className="form-item">
                    <select name="language">
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="js">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                    <button type="submit">
                        Create File
                    </button>
                </div>
            </form>
        </div>
    )
}