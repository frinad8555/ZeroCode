import { use, useContext } from "react";
import "./index.scss";
import { PlayContext } from "../../../Provider/PlaygroundProvider";
import { ModalContext, modalConst } from "../../../Provider/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({folderName, cards, folderId}) => {
    const {deleteFolder, deleteFile} = useContext(PlayContext);
    const {openModal, setPayload} = useContext(ModalContext);

    const deleteFolderFunc = () => {
        deleteFolder(folderId);
    }
    const editFolderFunc = () => {
        setPayload(folderId);
        openModal(modalConst.edit_folder);
    }
    const createNewFileFunc = () => {
        setPayload(folderId);
        openModal(modalConst.create_file);
    }
    const navigate = useNavigate();
    
    return <div className="folders-container">
        <div className="folders-header">
            <div className="left-folders">
                <span
                    className="material-symbols-outlined filled"
                >
                    folder
                </span>
                <span>{folderName}</span>
            </div>
            <div className="right-folders">
                <span className="material-symbols-outlined" onClick={deleteFolderFunc}>
                    delete
                </span>
                <span className="material-symbols-outlined" onClick={editFolderFunc}>
                    edit
                </span>
                <button onClick={createNewFileFunc}>
                    + New Playground
                </button>
            </div>
        </div>
        <div className="cards-container">
            {
                cards?.map((file, index) => {
                    const editFileFunc = () => {
                        setPayload({fileId: file.id, folderId: folderId});
                        openModal(modalConst.edit_file);
                    }

                    const deleteFileFunc = () => {
                        deleteFile(folderId, file.id);
                    }

                    const goToEditor = () => {
                        console.log({fileId: file.id, folderId: folderId});
                        navigate(`/editor/${file.id}/${folderId}`);
                    }

                    return (
                        <div className="cards" key={index} onClick={goToEditor}>
                            <img src="logo-small.png" />
                            <div className="name-of-file">
                                <span>{file?.filename}</span>
                                <span>Language: {file?.language}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span className="material-symbols-outlined" onClick={deleteFileFunc}>
                                    delete
                                </span>
                                <span className="material-symbols-outlined" onClick={editFileFunc}>
                                    edit
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
}

export const RightComponent = () => {
    const {folders} = useContext(PlayContext);
    const modalFeature = useContext(ModalContext);

    const createNewFolder = () => {
        modalFeature.openModal(modalConst.create_folder);
    }
    return (
        <div className="right-container">
            <div className="heading">
                <h1>My Code</h1>
                <button className="new-folder" onClick={createNewFolder}>
                    + New Folder
                </button>
            </div>
            {
                folders?.map((folder, index) => {
                    return <Folder folderName={folder?.name} cards={folder?.files} key={index} folderId={folder?.id}/>
                })
            }
        </div>
    )
}