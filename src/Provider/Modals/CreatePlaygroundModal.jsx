import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { PlayContext } from "../PlaygroundProvider";
import "./createPlaygroundModal.scss"

export const CreatePlaygroundModal = () => {
    const modalFeature = useContext(ModalContext);
    const playgroundFeature = useContext(PlayContext);
    const closeModal = () => {
        modalFeature.closeModal();
    };
    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;
        playgroundFeature.createNewPlayground({
            folderName, fileName, language
        });
        closeModal();
    }
    return (
        <div className="new-modal-container">
            <form className="new-modal-form" onSubmit={onSubmitModal}>
                <span className="material-symbols-outlined close" onClick={closeModal}>close</span>
                <h1>Create New Playground</h1>
                <div className="new-form-item">
                    <p>Enter Folder Name:</p>
                    <input name="folderName" required />
                </div>
                <div className="new-form-item">
                    <p>Enter File Name:</p>
                    <input name="fileName" required />
                </div>
                <div className="new-form-item">
                    <select name="language">
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="js">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                    <button type="submit">
                        Create Playground
                    </button>
                </div>
            </form>
        </div>
    )
}