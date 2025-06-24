import { useParams } from "react-router-dom";
import "./index.scss";
import { EditorScreen } from "./EditorScreen";

export const Editor = () => {
    const { fileId, folderId } = useParams();

    return (
        <div className="main-container">
            <div className="header">
                <img src="/logo-small.png" className="logo" />
            </div>
            <div className="code-container">
                <div className="editor-container">
                    <EditorScreen />
                </div>
                <div className="io-container">
                    <div className="io-header">
                        <b>Input</b>
                        <label htmlFor="input" className="icon-container">
                            <span className="material-symbols-outlined">upload</span>
                            <b>Import Input</b>
                        </label>
                        <input type="file" id="input" style={{ display: 'none' }} />
                    </div>
                    <textarea></textarea>
                </div>
                <div className="io-container">
                    <div className="io-header">
                        <b>Output</b>
                        <button className="icon-container">
                            <span className="material-symbols-outlined">download</span>
                            <b>Export Output</b>
                        </button>
                    </div>
                    <textarea readOnly></textarea>
                </div>
            </div>

        </div>
    )
}