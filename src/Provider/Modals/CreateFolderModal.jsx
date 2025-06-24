import { useContext } from "react";
import "./createFolderModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlayContext } from "../PlaygroundProvider";

export const CreateFolderModal = () => {
    const modalFeature = useContext(ModalContext);
    const {createNewFolder} = useContext(PlayContext);
    const closeModal = () => {
        modalFeature.closeModal();
    }
    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        createNewFolder(folderName);
        closeModal();
    }
    return (
        <div className="modal-container">
            <form className="create-folder-form" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-symbols-outlined close">close</span>
                <h1>Create New Folder</h1>
                <div className="input-container">
                    <input name="folderName" required placeholder="Enter Folder Name here"/>
                    <button type="submit">Create Folder</button>
                </div>
            </form>
        </div>
    )
}