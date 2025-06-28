import { useParams } from "react-router-dom";
import "./index.scss";
import { EditorScreen } from "./EditorScreen";
import { useCallback, useState } from "react";
import { makeSubmission } from "./submission";

export const Editor = () => {
    const { fileId, folderId } = useParams();
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const onImportInput = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = ['.txt'];
        const fileName = file.name.toLowerCase();
        const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));
        if (isValid) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                setInput(e.target.result);
            }
        }
        else {
            alert("Please choose a valid file.")
        }
    }
    const onExportOutput = () => {
        const opVal = output.trim();
        if (!opVal) {
            alert("Output is Empty!");
            return;
        }

        const blob = new Blob([opVal], { type: "text/plain" })
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `output.txt`;
        link.click();
    }

    const callback = ({ apiStatus, data, message }) => {
        if (apiStatus === 'loading') {
            setShowLoader(true);
        }
        else if (apiStatus === 'error') {
            setShowLoader(false);
            setOutput(message);
        }
        else {
            setShowLoader(false);
            if (data.status_id == 3) {
                setOutput(atob(data.stdout));
            }
            else {
                setOutput(atob(data.stderr))
            }
        }
    }
    const runCode = useCallback((code, lang) => {
        makeSubmission({ code, lang, stdin: input, callback })
    }, [input])

    return (
        <div className="main-container">
            <div className="header">
                <h1 className="logo">Zero Code</h1>
            </div>
            <div className="code-container">
                <div className="editor-container">
                    <EditorScreen fileId={fileId} folderId={folderId} runCode={runCode} />
                </div>
                <div className="io-container">
                    <div className="io-header">
                        <b>Input</b>
                        <label htmlFor="input" className="icon-container">
                            <span className="material-symbols-outlined">upload</span>
                            <b>Import Input</b>
                        </label>
                        <input type="file" id="input" style={{ display: 'none' }} onChange={onImportInput} />
                    </div>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
                </div>
                <div className="io-container">
                    <div className="io-header">
                        <b>Output</b>
                        <button className="icon-container" onClick={onExportOutput}>
                            <span className="material-symbols-outlined">download</span>
                            <b>Export Output</b>
                        </button>
                    </div>
                    <textarea value={output} onChange={(e) => setOutput(e.target.value)}></textarea>
                </div>
            </div>

            {showLoader && <div className="page-loader">
                <div className="loader">

                </div>
            </div>}
        </div>
    )
}