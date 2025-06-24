import { useContext } from "react";
import "./createFolderModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlayContext } from "../PlaygroundProvider";

export const EditFolder = () => {
    const {closeModal, payload} = useContext(ModalContext);
    const {editFolder} = useContext(PlayContext);
    const onSubmitModal = (e) => {
        e.preventDefault();
        const name = e.target.folderName.value;
        editFolder(payload, name);
        closeModal();
    }   
    return (
        <div className="modal-container">
            <form className="create-folder-form" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined close">close</span>
                <h1>Edit Folder Name</h1>
                <div className="input-container">
                    <input name="folderName" required placeholder="Enter Folder Name here"/>
                    <button type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}