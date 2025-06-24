import { useContext } from "react";
import "./createFolderModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlayContext } from "../PlaygroundProvider";

export const EditFile = () => {
    const {closeModal, payload} = useContext(ModalContext);
    const {editFile} = useContext(PlayContext);
    const onSubmitModal = (e) => {
        e.preventDefault();
        const name = e.target.fileName.value;
        editFile(payload.folderId, payload.fileId, name);
        closeModal();
    }   
    return (
        <div className="modal-container">
            <form className="create-folder-form" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined close">close</span>
                <h1>Edit File Name</h1>
                <div className="input-container">
                    <input name="fileName" required placeholder="Enter File Name here"/>
                    <button type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}