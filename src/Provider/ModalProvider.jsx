import { createContext, useState } from "react"
import { CreatePlaygroundModal } from "./Modals/CreatePlaygroundModal";

export const ModalContext = createContext();
export const modalConst = {
    create_playground: "CREATE_PLAYGROUND",
    create_folder: "CREATE_FOLDER",
    edit_folder: "EDIT_FOLDER",
    edit_file: "EDIT_FILE",
    create_file: "CREATE_FILE"
}
export const ModalProvider = (props) => {
    const [modalType, setModalType] = useState(null);
    const [payload, setPayload] = useState(null);
    const closeModal = () => {
        setModalType(null);
    }
    
    console.log({modalType});
    const modalFeature = {
        openModal:setModalType,
        closeModal,
        activeModal: modalType,
        payload,
        setPayload
    }
    return (
        <ModalContext.Provider value={modalFeature}>
            {props.children}
        </ModalContext.Provider>
    )
}