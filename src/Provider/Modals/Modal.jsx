import { useContext } from "react"
import { ModalContext, modalConst } from "../ModalProvider";
import { CreatePlaygroundModal } from "./CreatePlaygroundModal";
import { CreateFolderModal } from "./CreateFolderModal";
import { EditFolder } from "./EditFolder";
import { EditFile } from "./EditFile";
import { CreateNewFile } from "./CreateNewFile";

export const Modal = () => {
    const modalFeature = useContext(ModalContext);
    console.log(modalFeature.activeModal);
    return (
        <>
            {modalFeature.activeModal === modalConst.create_playground && <CreatePlaygroundModal />}
            {modalFeature.activeModal === modalConst.create_folder && <CreateFolderModal />}
            {modalFeature.activeModal === modalConst.edit_folder && <EditFolder />}
            {modalFeature.activeModal === modalConst.edit_file && <EditFile />}
            {modalFeature.activeModal === modalConst.create_file && <CreateNewFile />}
        </>
    )
}