import { useContext } from "react";
import { RightComponent } from "./RightComponent"
import "./index.scss"
import { ModalContext, modalConst } from "../../Provider/ModalProvider";

export const HomeScreen = () => {
    const modalFeature = useContext(ModalContext);
    const createPlaygroundModal = () => {
        modalFeature.openModal(modalConst.create_playground);
    };
    return (
        <div className="home-container">
            <div className="left">
                <div className="subleft">
                    <h1>Zero Code</h1>
                    <h2>Code. Compile. Conclude.</h2>
                    <button onClick={createPlaygroundModal}>Create Folder +</button>
                </div>
            </div>
            <RightComponent />

        </div>
    )
}